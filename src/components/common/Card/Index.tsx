import React, { JSX } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

import { EffectCoverflow, Navigation } from "swiper";

export default function Card({ images, getActiveIndex }: any): JSX.Element {
  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={2}
        onSlideChange={(e) => getActiveIndex(e.activeIndex)}
        coverflowEffect={{
          rotate: 60,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        navigation={true}
        modules={[EffectCoverflow, Navigation]}
        className="mySwiper"
      >
        {
          images.map((item: { url: string }) => (
            <SwiperSlide key={item?.url}>
              <img src={item.url} alt="ai generated images" />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </>
  );
}