"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

type SliderProps = {
  images: { url: string; alt: string }[];
};

const modules = [FreeMode, Navigation, Thumbs];

const ImageSliderInner = ({ images }: SliderProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className="flex flex-col gap-y-4">
      <Swiper
        spaceBetween={10}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={modules}
        className="w-full aspect-square border border-slate-200 overflow-hidden rounded-lg"
      >
        {images.map((image, index) => (
          <SwiperSlide key={image.url + index}>
            <div className="relative aspect-square w-full overflow-hidden bg-slate-50">
              {!!image.url && (
                <Image
                  fill
                  src={image.url + '?imageMogr2/format/webp/thumbnail/1000x1000'}
                  priority={index <= 2 ? true : false}
                  className="absolute inset-0 aspect-square object-contain"
                  alt={`Product image ${index + 1}`}
                  sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
                />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={6}
        freeMode={true}
        watchSlidesProgress={true}
        modules={modules}
        className="swiper-thumbs"
      >
        {images.map((image, index) => (
          <SwiperSlide key={`thumb-${image.url}`}>
            <div className="relative aspect-square w-full overflow-hidden bg-ui-bg-subtle cursor-pointer">
              {!!image.url && (
                <Image
                  src={`${image.url}?imageMogr2/thumbnail/100x/format/webp`}
                  priority={index <= 2 ? true : false}
                  className="absolute inset-0 aspect-square object-contain"
                  alt={`Product thumbnail ${index + 1}`}
                  fill
                  sizes="100px"
                />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const ImageSlider = ({ images }: SliderProps) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) {
    return null;
  }

  return <ImageSliderInner images={images} />;
};

export default ImageSlider;
