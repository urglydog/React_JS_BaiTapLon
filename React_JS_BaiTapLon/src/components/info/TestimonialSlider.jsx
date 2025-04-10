import React, { useState, useEffect } from "react";

const TestimonialSlider = ({
  testimonials = [
    {
      id: 1,
      text: "My first order arrived today in perfect condition...",
      author: "Tama Brown",
    },
    {
      id: 2,
      text: "Excellent customer service and fast delivery!",
      author: "John Smith",
    },
    {
      id: 3,
      text: "Very happy with the product quality and support.",
      author: "Emily Johnson",
    },
  ],
  autoPlay = true,
  interval = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  // Tự động chuyển slide
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, interval);
    }
    return () => clearInterval(timer);
  }, [currentIndex, isPlaying, interval, testimonials.length]);

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    if (autoPlay) setIsPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
    if (autoPlay) setIsPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    if (autoPlay) setIsPlaying(false);
  };

  return (
    <div className="relative max-w-5xl mx-auto p-8 rounded-md shadow-md bg-[#f5f7ff]">
      {/* Nút điều hướng trái/phải */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-2">
        <button 
          onClick={goToPrev}
          className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 z-10"
          aria-label="Previous testimonial"
        >
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
      
      <div className="absolute inset-y-0 right-0 flex items-center pr-2">
        <button 
          onClick={goToNext}
          className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 z-10"
          aria-label="Next testimonial"
        >
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Nội dung đánh giá */}
      <div className="overflow-hidden relative h-64">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="h-full flex flex-col justify-center items-center text-center px-12">
              <p className="text-black text-lg italic leading-relaxed mb-6">
                "{testimonial.text}"
              </p>
              <p className="text-gray-900 font-semibold text-lg mb-8">
                - {testimonial.author}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Phần điều khiển dưới cùng */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-6">
        {/* Nút để lại đánh giá */}
        <button className="px-6 py-3 bg-white text-blue-600 font-medium rounded-full border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-200 mb-4 md:mb-0">
          Leave Us A Review
        </button>

        {/* Indicator dots */}
        <div className="flex space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? "bg-blue-600" : "bg-gray-300"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;