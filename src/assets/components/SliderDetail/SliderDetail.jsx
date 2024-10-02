import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './SliderDetail.css';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

export default function SliderDetail() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><img src="https://static01.nyt.com/images/2018/07/26/style/26SNEAKERS1/26SNEAKERS1-articleLarge-v3.jpg?quality=75&auto=webp&disable=upscale" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://static01.nyt.com/images/2018/07/26/style/26SNEAKERS1/26SNEAKERS1-articleLarge-v3.jpg?quality=75&auto=webp&disable=upscale" alt="" /></SwiperSlide>
        {/* <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide> */}
      </Swiper>
    </>
  );
}
