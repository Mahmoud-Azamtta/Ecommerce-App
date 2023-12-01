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
        modules={[Navigation, Pagination, Autoplay, A11y]}
        spaceBetween={gap}
        slidesPerView={slides}
        navigation
        autoplay
        loop
        pagination={{ clickable: true }}
      >
        {children}
      </Swiper>
    </div>
  );
}

export default Slider;