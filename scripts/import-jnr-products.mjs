#!/usr/bin/env node

import { createHash, randomUUID } from 'node:crypto'
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'

import { HeadObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { load } from 'cheerio'
import dotenv from 'dotenv'

const EXPECTED_PRODUCT_COUNT = 48
const MAX_IMAGE_BYTES = 30 * 1024 * 1024
const REQUEST_TIMEOUT_MS = 45_000
const DEFAULT_MANIFEST = '/tmp/jnr-product-import.json'
const DEFAULT_CACHE_DIR = '/tmp/jnr-product-import-cache'
const DEFAULT_OVERRIDES = resolve('scripts/data/jnr-localization-overrides.json')
const PRODUCTS_PATH = resolve('src/data/products.json')
const LOCALES = {
  en: 'www',
  es: 'es',
  fr: 'fr',
  de: 'de',
  it: 'it',
  pt: 'pt',
  ru: 'ru',
  pl: 'pl',
}
const PAGE_HOSTS = new Set(Object.values(LOCALES).map((subdomain) => `${subdomain}.jnrvapor.com`))
const IMAGE_HOSTS = new Set(['ecdn6.globalso.com'])
const IMAGE_CONTENT_TYPES = new Set(['image/avif', 'image/gif', 'image/jpeg', 'image/png', 'image/webp'])

const usage = `Usage:
  node scripts/import-jnr-products.mjs [options]

Options:
  --env-file <file>       Load S3-compatible COS credentials from a dotenv file
  --manifest <file>       Resume/write import progress (default: ${DEFAULT_MANIFEST})
  --cache-dir <dir>       Cache downloaded pages (default: ${DEFAULT_CACHE_DIR})
  --overrides <file>       Local translations for missing official pages
  --concurrency <number>  Concurrent page/image operations (default: 4)
  --skip-upload           Keep official source image URLs instead of uploading to COS
  --apply                 Replace/add the JNR catalog in src/data/products.json
  --help                  Show this help
`

function parseArgs(argv) {
  const options = {
    apply: false,
    cacheDir: DEFAULT_CACHE_DIR,
    concurrency: 4,
    manifest: DEFAULT_MANIFEST,
    skipUpload: false,
  }

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index]
    if (argument === '--apply') options.apply = true
    else if (argument === '--skip-upload') options.skipUpload = true
    else if (argument === '--help') options.help = true
    else if (argument === '--env-file') options.envFile = requireOptionValue(argv, ++index, argument)
    else if (argument === '--manifest') options.manifest = requireOptionValue(argv, ++index, argument)
    else if (argument === '--cache-dir') options.cacheDir = requireOptionValue(argv, ++index, argument)
    else if (argument === '--overrides') options.overrides = requireOptionValue(argv, ++index, argument)
    else if (argument === '--concurrency') options.concurrency = Number(requireOptionValue(argv, ++index, argument))
    else throw new Error(`Unknown option: ${argument}`)
  }

  if (!Number.isInteger(options.concurrency) || options.concurrency < 1 || options.concurrency > 12) {
    throw new Error('--concurrency must be an integer between 1 and 12')
  }

  return options
}

async function applyLocalizationOverrides(sourceProducts, path = DEFAULT_OVERRIDES) {
  const overrides = JSON.parse(await readFile(path, 'utf8'))
  let applied = 0
  for (const product of sourceProducts) {
    for (const [locale, localized] of Object.entries(overrides[product.slug] || {})) {
      if (!LOCALES[locale] || product.localized[locale]) continue
      product.localized[locale] = {
        ...product.localized.en,
        ...localized,
        images: product.localized.en.images,
        puffs: product.localized.en.puffs,
        title: product.localized.en.title,
      }
      applied += 1
    }
  }
  return applied
}

function requireOptionValue(argv, index, option) {
  const value = argv[index]
  if (!value || value.startsWith('--')) throw new Error(`Missing value for ${option}`)
  return value
}

function requiredEnv(...names) {
  for (const name of names) {
    const value = process.env[name]?.trim()
    if (value) return value
  }
  throw new Error(`Missing required environment variable: ${names.join(' or ')}`)
}

function productUrl(locale, slug = '') {
  const suffix = slug ? `${slug}/` : ''
  return `https://${LOCALES[locale]}.jnrvapor.com/product/${suffix}`
}

function assertAllowedUrl(input, allowedHosts) {
  const url = new URL(input)
  if (url.protocol !== 'https:' || !allowedHosts.has(url.hostname)) {
    throw new Error(`URL is outside the allowed import hosts: ${input}`)
  }
  return url
}

function cachePath(cacheDir, url) {
  return resolve(cacheDir, `${createHash('sha256').update(url).digest('hex')}.html`)
}

async function fetchWithRetry(url, { allowedHosts, binary = false, retries = 3 } = {}) {
  assertAllowedUrl(url, allowedHosts)
  let lastError

  for (let attempt = 1; attempt <= retries; attempt += 1) {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
    try {
      const response = await fetch(url, {
        headers: { 'user-agent': 'VapesoooCatalogImporter/1.0 (+https://vapesooo.com)' },
        signal: controller.signal,
      })
      assertAllowedUrl(response.url, allowedHosts)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      return binary ? response : await response.text()
    } catch (error) {
      lastError = error
      if (attempt < retries) await new Promise((resolvePromise) => setTimeout(resolvePromise, attempt * 750))
    } finally {
      clearTimeout(timeout)
    }
  }

  throw new Error(`Request failed after ${retries} attempts: ${url} (${lastError?.message || lastError})`)
}

async function fetchPage(url, cacheDir) {
  const target = cachePath(cacheDir, url)
  try {
    return await readFile(target, 'utf8')
  } catch {
    const html = await fetchWithRetry(url, { allowedHosts: PAGE_HOSTS })
    await writeFile(target, html, 'utf8')
    return html
  }
}

function cleanText(value) {
  return value.replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim()
}

function cleanHtml(fragment) {
  const $ = load(fragment || '', null, false)
  $('script, style, iframe, video, source, form, button').remove()
  $('[style]').removeAttr('style')
  $('[onclick], [onload], [onerror]').each((_, element) => {
    $(element).removeAttr('onclick').removeAttr('onload').removeAttr('onerror')
  })
  $('a').each((_, element) => {
    const href = $(element).attr('href')
    if (!href || !/^https:\/\//i.test(href)) $(element).removeAttr('href')
  })
  return $.html().trim()
}

function truncateAtWord(value, maxLength = 300) {
  const text = cleanText(value)
  if (text.length <= maxLength) return text
  const shortened = text.slice(0, maxLength + 1)
  return `${shortened.slice(0, shortened.lastIndexOf(' ')) || shortened.slice(0, maxLength)}…`
}

function parseArchive(html) {
  const $ = load(html)
  const products = []
  const seen = new Set()
  $('a.item-inner[href^="/product/"]').each((_, element) => {
    const href = $(element).attr('href') || ''
    const slug = href.match(/^\/product\/([^/]+)\/?$/)?.[1]
    if (!slug || seen.has(slug)) return
    const title = cleanText($(element).find('.item-title').first().text())
    if (!title) return
    const image = $(element).find('img').first().attr('src') || $(element).find('img').first().attr('data-src')
    seen.add(slug)
    products.push({ slug, title, image })
  })
  return products
}

function extractPuffs(value) {
  const candidates = []
  for (const match of value.matchAll(/(\d+(?:[.,]\d+)?)\s*k\+?\s*puffs?/gi)) {
    candidates.push(Math.round(Number(match[1].replace(',', '.')) * 1000))
  }
  for (const match of value.matchAll(/\b(\d{3,6})\s*puffs?/gi)) candidates.push(Number(match[1]))
  return candidates.length ? Math.max(...candidates) : undefined
}

function parseDetail(html, archiveImage) {
  const $ = load(html)
  const pageTitle = cleanText($('title').first().text())
  const title = cleanText($('h1[producttitle]').first().text())
  const descriptionNode = $('[productdesc="1"] .editor-text-wrap').first()
  const descriptionText = cleanText(descriptionNode.text())
  const metaDescription = cleanText($('meta[name="description"]').attr('content') || '')
  const keywords = cleanText($('meta[name="keywords"]').attr('content') || '')
  const images = []
  $('#sectionIdProduct .main-slider img[productimage]').each((_, element) => {
    const image = $(element).attr('src') || $(element).attr('data-src')
    if (image?.startsWith('https://') && !images.includes(image)) images.push(image)
  })
  if (images.length === 0 && archiveImage) images.push(archiveImage)

  if (!title || !descriptionText || images.length === 0) {
    throw new Error(`Incomplete product page: title=${Boolean(title)}, description=${Boolean(descriptionText)}, images=${images.length}`)
  }

  const excerpt = truncateAtWord(descriptionText || metaDescription)
  return {
    content: `<div class="jnr-product-content">${cleanHtml(descriptionNode.html())}</div>`,
    excerpt,
    images,
    keywords,
    pageTitle,
    puffs: extractPuffs(`${pageTitle} ${metaDescription} ${descriptionText}`),
    title,
  }
}

async function mapLimit(items, limit, mapper) {
  const output = new Array(items.length)
  let nextIndex = 0
  async function worker() {
    while (true) {
      const index = nextIndex++
      if (index >= items.length) return
      output[index] = await mapper(items[index], index)
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => worker()))
  return output
}

async function writeJsonAtomic(path, value) {
  await mkdir(dirname(path), { recursive: true })
  const temporary = `${path}.${process.pid}.${randomUUID()}.tmp`
  await writeFile(temporary, `${JSON.stringify(value, null, 2)}\n`, 'utf8')
  await rename(temporary, path)
}

let manifestWriteQueue = Promise.resolve()
function queueManifestWrite(path, value) {
  manifestWriteQueue = manifestWriteQueue.then(() => writeJsonAtomic(path, value))
  return manifestWriteQueue
}

async function readManifest(path) {
  try {
    return JSON.parse(await readFile(path, 'utf8'))
  } catch {
    return { uploads: {} }
  }
}

async function readImage(response, source) {
  const contentType = response.headers.get('content-type')?.split(';', 1)[0].toLowerCase()
  if (!IMAGE_CONTENT_TYPES.has(contentType)) throw new Error(`Unsupported image content type ${contentType}: ${source}`)
  const declaredLength = Number(response.headers.get('content-length'))
  if (Number.isFinite(declaredLength) && declaredLength > MAX_IMAGE_BYTES) throw new Error(`Image exceeds 30 MB: ${source}`)
  const reader = response.body?.getReader()
  if (!reader) throw new Error(`Image has no response body: ${source}`)
  const chunks = []
  let total = 0
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    total += value.byteLength
    if (total > MAX_IMAGE_BYTES) {
      await reader.cancel()
      throw new Error(`Image exceeds 30 MB: ${source}`)
    }
    chunks.push(value)
  }
  return { body: Buffer.concat(chunks), contentType }
}

function createS3Client() {
  const accessKeyId = requiredEnv('S3_ACCESS_KEY_ID', 'COS_SECRET_ID')
  const secretAccessKey = requiredEnv('S3_SECRET_ACCESS_KEY', 'COS_SECRET_KEY')
  const region = requiredEnv('S3_REGION', 'COS_REGION')
  const endpoint = requiredEnv('S3_ENDPOINT')
  return {
    bucket: requiredEnv('S3_BUCKET', 'COS_BUCKET'),
    publicBaseUrl: requiredEnv('S3_FILE_URL', 'COS_PUBLIC_BASE_URL').replace(/\/+$/, ''),
    s3: new S3Client({ region, endpoint, credentials: { accessKeyId, secretAccessKey } }),
  }
}

async function uploadImage(source, storage) {
  assertAllowedUrl(source, IMAGE_HOSTS)
  const response = await fetchWithRetry(source, { allowedHosts: IMAGE_HOSTS, binary: true })
  const { body, contentType } = await readImage(response, source)
  const key = `products/${randomUUID()}`
  await storage.s3.send(new PutObjectCommand({
    Bucket: storage.bucket,
    Key: key,
    Body: body,
    ContentType: contentType,
  }))
  await storage.s3.send(new HeadObjectCommand({ Bucket: storage.bucket, Key: key }))
  return `${storage.publicBaseUrl}/${key}`
}

function buildProduct(source, uploads) {
  const english = source.localized.en
  const name = /^jnr\b/i.test(english.title) ? english.title : `JNR ${english.title}`
  const localized = Object.fromEntries(Object.keys(LOCALES).map((locale) => {
    const detail = source.localized[locale] || english
    return [locale, detail]
  }))
  const images = english.images.map((url, index) => ({
    url: uploads[url] || url,
    alt: index === 0 ? name : `${name} - Image ${index + 1}`,
  }))
  const product = {
    name,
    slug: source.slug.startsWith('jnr-') ? source.slug : `jnr-${source.slug}`,
    title: name,
    original_excerpt: english.excerpt,
    original_content: english.content,
    images,
    original_seo: { description: english.excerpt, keywords: english.keywords },
    content: Object.fromEntries(Object.entries(localized).map(([locale, detail]) => [locale, detail.content])),
    excerpt: Object.fromEntries(Object.entries(localized).map(([locale, detail]) => [locale, detail.excerpt])),
    seo: Object.fromEntries(Object.entries(localized).map(([locale, detail]) => [locale, {
      description: detail.excerpt,
      keywords: detail.keywords,
    }])),
  }
  if (english.puffs) product.puffs = english.puffs
  return product
}

async function applyCatalog(products) {
  const catalog = JSON.parse(await readFile(PRODUCTS_PATH, 'utf8'))
  catalog.JNR = { sort: 776, enabled: true, products }
  await writeJsonAtomic(PRODUCTS_PATH, catalog)
}

async function main() {
  const options = parseArgs(process.argv.slice(2))
  if (options.help) {
    console.log(usage)
    return
  }
  if (options.envFile) dotenv.config({ path: options.envFile, quiet: true })
  await mkdir(options.cacheDir, { recursive: true })

  const manifest = await readManifest(options.manifest)
  manifest.uploads ||= {}
  manifest.source = 'https://www.jnrvapor.com/product/'

  console.log('[catalog] Fetching official locale archives')
  const archives = Object.fromEntries(await mapLimit(Object.keys(LOCALES), options.concurrency, async (locale) => {
    const products = parseArchive(await fetchPage(productUrl(locale), options.cacheDir))
    console.log(`[catalog] ${locale}: ${products.length} products`)
    return [locale, products]
  }))
  if (archives.en.length !== EXPECTED_PRODUCT_COUNT) {
    throw new Error(`Expected ${EXPECTED_PRODUCT_COUNT} English products, found ${archives.en.length}`)
  }
  const localeSlugs = Object.fromEntries(Object.entries(archives).map(([locale, products]) => [
    locale,
    new Set(products.map((product) => product.slug)),
  ]))

  console.log(`[scrape] Fetching ${EXPECTED_PRODUCT_COUNT} products and official translations`)
  const sourceProducts = await mapLimit(archives.en, options.concurrency, async (archiveProduct, index) => {
    const localized = {}
    for (const locale of Object.keys(LOCALES)) {
      if (locale !== 'en' && !localeSlugs[locale].has(archiveProduct.slug)) continue
      try {
        const html = await fetchPage(productUrl(locale, archiveProduct.slug), options.cacheDir)
        localized[locale] = parseDetail(html, archiveProduct.image)
      } catch (error) {
        if (locale === 'en') throw error
        console.warn(`[fallback] ${archiveProduct.slug} ${locale}: ${error.message}`)
      }
    }
    console.log(`[scrape] ${index + 1}/${EXPECTED_PRODUCT_COUNT} ${archiveProduct.slug} (${Object.keys(localized).length} locales)`)
    return { slug: archiveProduct.slug, localized }
  })
  const overridesApplied = await applyLocalizationOverrides(sourceProducts, options.overrides)
  console.log(`[localize] Applied ${overridesApplied} reviewed fallback translations`)
  manifest.sourceProducts = sourceProducts
  manifest.overridesApplied = overridesApplied
  manifest.scrapedAt = new Date().toISOString()
  await writeJsonAtomic(options.manifest, manifest)

  const imageSources = [...new Set(sourceProducts.flatMap((product) => product.localized.en.images))]
  if (!options.skipUpload) {
    const storage = createS3Client()
    const pending = imageSources.filter((source) => !manifest.uploads[source])
    console.log(`[upload] ${imageSources.length} unique images; ${pending.length} pending`)
    await mapLimit(pending, options.concurrency, async (source, index) => {
      manifest.uploads[source] = await uploadImage(source, storage)
      await queueManifestWrite(options.manifest, manifest)
      console.log(`[upload] ${index + 1}/${pending.length}`)
    })
  }

  const products = sourceProducts.map((product) => buildProduct(product, manifest.uploads))
  manifest.products = products
  manifest.completedAt = new Date().toISOString()
  manifest.coverage = Object.fromEntries(Object.keys(LOCALES).map((locale) => [
    locale,
    sourceProducts.filter((product) => product.localized[locale]).length,
  ]))
  manifest.imageCount = imageSources.length
  await writeJsonAtomic(options.manifest, manifest)

  if (options.apply) {
    await applyCatalog(products)
    console.log(`[apply] Added JNR with ${products.length} products to ${PRODUCTS_PATH}`)
  }
  console.log(JSON.stringify({ products: products.length, images: imageSources.length, coverage: manifest.coverage }, null, 2))
}

main().catch((error) => {
  console.error(error instanceof Error ? error.stack || error.message : error)
  process.exitCode = 1
})
