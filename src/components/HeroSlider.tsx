'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation } from 'swiper/modules'
import type { HomeProductSliderItem } from '@/types/products'
import { productsMap } from '@/data'
import { LocalizedLink } from './Link'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'

type SliderProps = {
  images: HomeProductSliderItem[]
}

const modules = [FreeMode, Navigation]

const HeroSlider = ({ images }: SliderProps) => {
  return (
    <Swiper spaceBetween={10} modules={modules} className="w-ful">
      {images.map((image, index) => (
        <SwiperSlide key={image.image + index}>
          <LocalizedLink
            href={`/products/${image.product_slug}`}
            className="relative block aspect-[2/1] w-full overflow-hidden bg-slate-50">
            {!!image.image && (
              <Image
                fill
                src={image.image + '?imageMogr2/thumbnail/1920x'}
                priority={index <= 2 ? true : false}
                className="absolute inset-0 aspect-square object-cover"
                alt={productsMap[image.product_slug]?.title || 'Product Image'}
              />
            )}
          </LocalizedLink>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default HeroSlider
