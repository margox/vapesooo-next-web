'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Pagination, Autoplay } from 'swiper/modules'
import type { HomeProductSliderItem } from '@/types/products'
import { LocalizedLink } from './Link'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import './hero-slider.css'

type SliderProps = {
  images: HomeProductSliderItem[]
}

const modules = [FreeMode, Navigation, Pagination, Autoplay]

const HeroSlider = ({ images }: SliderProps) => {
  return (
    <Swiper
      spaceBetween={10}
      modules={modules}
      className="w-full hero-slider"
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}>
      {images.map((image, index) => (
        <SwiperSlide key={image.image + index}>
          <LocalizedLink
            href={`${image.path}`}
            className="relative block aspect-[1920/700] w-full overflow-hidden bg-slate-50">
            {!!image.image && (
              <img
                src={image.image + '?imageMogr2/thumbnail/1920x'}
                className="absolute inset-0 object-cover"
                alt={image.path}
              />
            )}
          </LocalizedLink>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default HeroSlider
