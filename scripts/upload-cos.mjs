#!/usr/bin/env node

import { createReadStream } from 'node:fs'
import { writeFile } from 'node:fs/promises'
import { extname } from 'node:path'
import { randomUUID } from 'node:crypto'

import { HeadObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import dotenv from 'dotenv'

const DOWNLOAD_TIMEOUT_MS = 30_000
const MAX_IMAGE_BYTES = 25 * 1024 * 1024
const CONTENT_TYPES = new Map([
  ['.avif', 'image/avif'],
  ['.gif', 'image/gif'],
  ['.jpeg', 'image/jpeg'],
  ['.jpg', 'image/jpeg'],
  ['.png', 'image/png'],
  ['.webp', 'image/webp'],
])
const SUPPORTED_CONTENT_TYPES = new Set(CONTENT_TYPES.values())

const usage = `Usage:
  node scripts/upload-cos.mjs [options] <file-or-url> [...]

Required environment variables:
  S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_BUCKET, S3_REGION, S3_ENDPOINT

Options:
  --prefix <path>              COS key prefix (default: COS_PREFIX or products)
  --public-base-url <url>      Public URL prefix (default: S3_FILE_URL or COS_PUBLIC_BASE_URL)
  --env-file <file>            Load S3-compatible COS credentials from a dotenv file
  --manifest <file>            Write uploaded source/key/url records to a JSON file
  --help                       Show this help
`

function parseArgs(argv) {
  const sources = []
  const options = {}

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index]
    if (argument === '--help') options.help = true
    else if (argument === '--prefix') options.prefix = requireOptionValue(argv, ++index, argument)
    else if (argument === '--public-base-url') options.publicBaseUrl = requireOptionValue(argv, ++index, argument)
    else if (argument === '--manifest') options.manifest = requireOptionValue(argv, ++index, argument)
    else if (argument === '--env-file') options.envFile = requireOptionValue(argv, ++index, argument)
    else if (argument.startsWith('--')) throw new Error(`Unknown option: ${argument}`)
    else sources.push(argument)
  }

  return { options, sources }
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

function contentTypeFromPath(pathname) {
  const contentType = CONTENT_TYPES.get(extname(pathname).toLowerCase())
  if (!contentType) throw new Error(`Unsupported image type: ${pathname}`)
  return contentType
}

function displaySource(source) {
  if (!/^https?:\/\//i.test(source)) return source
  const url = new URL(source)
  url.search = ''
  url.hash = ''
  return url.toString()
}

async function readResponseBytes(response, source) {
  const contentLength = Number(response.headers.get('content-length'))
  if (Number.isFinite(contentLength) && contentLength > MAX_IMAGE_BYTES) {
    throw new Error(`Image exceeds ${MAX_IMAGE_BYTES / 1024 / 1024} MB: ${displaySource(source)}`)
  }

  const reader = response.body?.getReader()
  if (!reader) throw new Error(`Download returned no content: ${displaySource(source)}`)

  const chunks = []
  let size = 0
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    size += value.byteLength
    if (size > MAX_IMAGE_BYTES) {
      await reader.cancel()
      throw new Error(`Image exceeds ${MAX_IMAGE_BYTES / 1024 / 1024} MB: ${displaySource(source)}`)
    }
    chunks.push(value)
  }
  return Buffer.concat(chunks)
}

async function readSource(source) {
  if (/^https?:\/\//i.test(source)) {
    const url = new URL(source)
    if (url.protocol !== 'https:') throw new Error(`Only HTTPS image URLs are supported: ${displaySource(source)}`)

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), DOWNLOAD_TIMEOUT_MS)
    try {
      const response = await fetch(source, { redirect: 'error', signal: controller.signal })
      if (!response.ok) throw new Error(`Download failed (${response.status}): ${source}`)
      const responseType = response.headers.get('content-type')?.split(';', 1)[0].toLowerCase()
      if (responseType && !SUPPORTED_CONTENT_TYPES.has(responseType)) {
        throw new Error(`Download is not a supported image: ${displaySource(source)}`)
      }
      const contentType = responseType || contentTypeFromPath(url.pathname)
      return {
        body: await readResponseBytes(response, source),
        contentType,
      }
    } finally {
      clearTimeout(timeout)
    }
  }

  return {
    body: createReadStream(source),
    contentType: contentTypeFromPath(source),
  }
}

async function main() {
  const { options, sources } = parseArgs(process.argv.slice(2))
  if (options.help) {
    console.log(usage)
    return
  }
  if (sources.length === 0) throw new Error('Provide at least one local file or URL')

  if (options.envFile) dotenv.config({ path: options.envFile, quiet: true })

  const accessKeyId = requiredEnv('S3_ACCESS_KEY_ID', 'COS_SECRET_ID')
  const secretAccessKey = requiredEnv('S3_SECRET_ACCESS_KEY', 'COS_SECRET_KEY')
  const bucket = requiredEnv('S3_BUCKET', 'COS_BUCKET')
  const region = requiredEnv('S3_REGION', 'COS_REGION')
  const endpoint = requiredEnv('S3_ENDPOINT')
  const prefix = (options.prefix || process.env.COS_PREFIX || 'products').replace(/^\/+|\/+$/g, '')
  if (!prefix) throw new Error('COS key prefix must not be empty')
  const publicBaseUrl = (options.publicBaseUrl || process.env.S3_FILE_URL || process.env.COS_PUBLIC_BASE_URL || `https://${bucket}.cos.${region}.myqcloud.com`).replace(/\/+$/, '')
  if (new URL(publicBaseUrl).protocol !== 'https:') throw new Error('Public base URL must use HTTPS')

  const s3 = new S3Client({ region, endpoint, credentials: { accessKeyId, secretAccessKey } })
  const records = []

  for (const source of sources) {
    const { body, contentType } = await readSource(source)
    const key = `${prefix}/${randomUUID()}`
    await s3.send(new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
    }))
    await s3.send(new HeadObjectCommand({ Bucket: bucket, Key: key }))
    records.push({ source: displaySource(source), key, url: `${publicBaseUrl}/${key}` })
    console.log(JSON.stringify(records.at(-1)))
  }

  if (options.manifest) {
    await writeFile(options.manifest, `${JSON.stringify(records, null, 2)}\n`, 'utf8')
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
