import React from "react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "../../css/slider.css";

function Slider({ slides, gap, children }) {
  return (
    <div className="">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={gap}
        slidesPerView={1}
        centeredSlides
        navigation
        autoplay
        loop
        breakpoints={{
          1200: {
            slidesPerView: 5 
          },
          900: {
            slidesPerView: 4
          },
          600: {
            slidesPerView: 3
          },
          400: {
            slidesPerView: 2
          }
        }}
        pagination={{ clickable: true }}
      >
        {children}
      </Swiper>
    </div>
  );
}

export default Slider;
