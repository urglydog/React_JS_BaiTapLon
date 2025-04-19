// src/components/Slideshow.jsx
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import banner image
import banner1 from "../assets/images/banner.png"; // Import banner image
import banner2 from "../assets/images/banner1.webp"; // Import banner image
import banner3 from "../assets/images/banner2.jpg"; // Import banner image
import banner4 from "../assets/images/banner3.avif"; // Import banner image

const Slideshow = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
  };

  const slides = [
    {
      id: 1,
      image: banner1,
      alt: "Banner 1",
    },
    {
      id: 2,
      image: banner2,
      alt: "Banner 2",
    },
    {
      id: 3,
      image: banner3,
      alt: "Banner 3",
    },
    {
      id: 4,
      image: banner4,
      alt: "Banner 4",
    },
  ];

  return (
    <div className="w-full max-w-screen-xl mx-auto mt-4 rounded-md overflow-hidden shadow-md">
      <Slider {...settings}>
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
    </div>
  );
};

export default Slideshow;
