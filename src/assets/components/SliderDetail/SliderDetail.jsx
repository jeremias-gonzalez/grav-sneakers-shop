// src/components/SliderDetail/SliderDetail.js

import React, { useState } from 'react';
import './SliderDetail.css';

const SliderDetail = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="slider-container">
      <button onClick={prevSlide} className="slider-button prev-button">
        &#10094;
      </button>
      <img src={images[currentIndex]} alt={`Product image ${currentIndex}`} className="slider-image" />
      <button onClick={nextSlide} className="slider-button next-button">
        &#10095;
      </button>
    </div>
  );
};

export default SliderDetail;
