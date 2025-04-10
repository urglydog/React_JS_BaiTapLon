import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard"; // đảm bảo đường dẫn đúng

const ProductSlider = ({ products = [], autoPlay = false, interval = 5000, visibleCount = 5 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  const maxIndex = Math.max(products.length - visibleCount, 0);

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex >= maxIndex ? 0 : prevIndex + 1
        );
      }, interval);
    }
    return () => clearInterval(timer);
  }, [currentIndex, isPlaying, interval, maxIndex]);

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex <= 0 ? maxIndex : prevIndex - 1
    );
    if (autoPlay) setIsPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= maxIndex ? 0 : prevIndex + 1
    );
    if (autoPlay) setIsPlaying(false);
  };

  return (
    <div className="py-6 max-w-screen-xl mx-auto relative">

      {/* Nút điều hướng */}
      <button
        onClick={goToPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
      >
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
      >
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${(100 / visibleCount) * currentIndex}%)` }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className={`w-[calc(100%/${visibleCount})] flex-shrink-0 px-2`}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ProductSlider;
