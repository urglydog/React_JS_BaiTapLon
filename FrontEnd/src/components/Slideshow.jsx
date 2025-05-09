import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import banner1 from "../assets/images/banner.png";
import banner2 from "../assets/images/banner1.webp";
import banner3 from "../assets/images/banner2.jpg";
import banner4 from "../assets/images/banner3.avif";

const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showArrows, setShowArrows] = useState(false); // State để kiểm soát hiển thị nút
  const sliderRef = useRef(null);

  const slides = [
    { id: 1, image: banner1, alt: "Banner 1" },
    { id: 2, image: banner2, alt: "Banner 2" },
    { id: 3, image: banner3, alt: "Banner 3" },
    { id: 4, image: banner4, alt: "Banner 4" },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
  };

  const goToPrev = () => {
    sliderRef.current?.slickPrev();
  };

  const goToNext = () => {
    sliderRef.current?.slickNext();
  };

  return (
    <div
      className="w-full max-w-screen-xl mx-auto mt-4 relative rounded-md overflow-hidden shadow-md"
      onMouseEnter={() => setShowArrows(true)} // Hiện nút khi hover vào slideshow
      onMouseLeave={() => setShowArrows(false)} // Ẩn nút khi rời chuột
    >
      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide) => (
          <div key={slide.id}>
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-[400px] object-contain"
            />
          </div>
        ))}
      </Slider>

      {/* Custom arrows */}
      <button
        onClick={goToPrev}
        className={`absolute top-1/2 left-2 z-50 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition-opacity duration-300 ${
          showArrows ? "opacity-100" : "opacity-0"
        }`}
      >
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className={`absolute top-1/2 right-2 z-50 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition-opacity duration-300 ${
          showArrows ? "opacity-100" : "opacity-0"
        }`}
      >
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Slide indicator */}
      <div className="absolute bottom-2 right-4 bg-white/80 text-gray-800 text-sm px-3 py-1 rounded-full shadow">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
};

export default Slideshow;