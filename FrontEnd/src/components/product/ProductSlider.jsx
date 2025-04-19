import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard"; // đảm bảo đường dẫn đúng

const ProductSlider = ({
  products = [],
  autoPlay = false,
  interval = 5000,
  visibleCount = 5,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  const shouldSlide = products.length > visibleCount;
  const maxIndex = shouldSlide ? products.length - visibleCount : 0;

  useEffect(() => {
    let timer;
    if (isPlaying && shouldSlide) {
      timer = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex >= maxIndex ? 0 : prevIndex + 1
        );
      }, interval);
    }
    return () => clearInterval(timer);
  }, [currentIndex, isPlaying, interval, maxIndex, shouldSlide]);

  const goToPrev = () => {
    if (!shouldSlide || currentIndex === 0) return;
    setCurrentIndex((prevIndex) => prevIndex - 1);
    if (autoPlay) setIsPlaying(false);
  };

  const goToNext = () => {
    if (!shouldSlide || currentIndex >= maxIndex) return;
    setCurrentIndex((prevIndex) => prevIndex + 1);
    if (autoPlay) setIsPlaying(false);
  };

  return (
    <div className="relative w-full">
      {/* Nút điều hướng chỉ hiện nếu có thể trượt */}
      {shouldSlide && (
        <>
          <button
            onClick={goToPrev}
            disabled={currentIndex === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 ${
              currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <svg
              className="w-6 h-6 text-blue-600"
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
            disabled={currentIndex >= maxIndex}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 ${
              currentIndex >= maxIndex ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <svg
              className="w-6 h-6 text-blue-600"
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
        </>
      )}

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: shouldSlide
              ? `translateX(-${(100 / visibleCount) * currentIndex}%)`
              : "translateX(0%)",
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className={`px-2 ${
                shouldSlide
                  ? "w-[calc(100%/_" + visibleCount + ")] flex-shrink-0"
                  : "w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
              }`}
              style={{ minHeight: "350px" }} // chỉnh chiều cao phù hợp với card
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
