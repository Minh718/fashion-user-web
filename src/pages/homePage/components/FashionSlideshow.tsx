import React, { useState, useEffect, useCallback } from "react";
import { FaChevronLeft, FaChevronRight, FaPause, FaPlay } from "react-icons/fa";

const FashionSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
      title: "Summer Collection",
      description: "Elegant and breezy outfits for the season",
      price: "$129.99",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc",
      title: "Formal Wear",
      description: "Sophisticated suits for any occasion",
      price: "$249.99",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e",
      title: "Casual Chic",
      description: "Comfortable yet stylish everyday wear",
      price: "$89.99",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
      title: "Accessories Collection",
      description: "Complete your look with our trendy accessories",
      price: "$39.99",
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(nextSlide, 5000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  return (
    <div className="relative w-full mx-auto overflow-hidden">
      <div className="relative h-[400px] md:h-[600px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="object-cover w-full h-full"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-black bg-opacity-50 text-white ">
              <h2 className="text-2xl font-bold lg:visible invisible">{slide.title}</h2>
              <p className="text-sm lg:visible invisible">{slide.description}</p>
              {/* <p className="text-lg font-semibold mt-2">{slide.price}</p> */}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="text-gray-800 text-2xl" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        aria-label="Next slide"
      >
        <FaChevronRight className="text-gray-800 text-2xl" />
      </button>

      <div className="absolute bottom-[85px] left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full focus:outline-none ${
              index === currentSlide ? "bg-white" : "bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>

      <button
        onClick={togglePlayPause}
        className="absolute bottom-4 right-4 bg-white bg-opacity-50 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
      >
        {isPlaying ? (
          <FaPause className="text-gray-800 text-xl" />
        ) : (
          <FaPlay className="text-gray-800 text-xl" />
        )}
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 overflow-x-auto max-w-full">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className={`focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${
              index === currentSlide ? "ring-2 ring-white" : ""
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-16 h-16 object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default FashionSlideshow;