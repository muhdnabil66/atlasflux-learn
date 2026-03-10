"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";

const slides = [
  { id: 1, image: "/banner1.jpg", alt: "Banner 1" },
  { id: 2, image: "/banner2.jpg", alt: "Banner 2" },
  { id: 3, image: "/banner6.jpg", alt: "Banner 3" },
  { id: 4, image: "/banner4.jpg", alt: "Banner 4" },
];

export default function HeroSlider() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        speed={1000}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                className="object-cover"
                priority
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Bottom blend gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none bg-gradient-to-t from-white to-transparent opacity-30" />
    </div>
  );
}
