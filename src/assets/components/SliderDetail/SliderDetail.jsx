import {useEffect} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const SliderDetail = ({ images }) => {
  if (!Array.isArray(images)) {
    return <div>No hay imágenes disponibles.</div>; // Manejo del caso donde images no es un array
  }

  return (
    <div>
      <Swiper spaceBetween={10} slidesPerView={1}>
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img src={image} alt={`Product Image ${index + 1}`} className="w-full h-auto" />
        </SwiperSlide>
      ))}
    </Swiper>
    </div>
  );
};

export default SliderDetail;
