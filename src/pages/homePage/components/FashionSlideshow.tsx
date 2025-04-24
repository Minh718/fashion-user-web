import React, { useState, useEffect, useCallback } from "react";
import { FaChevronLeft, FaChevronRight, FaPause, FaPlay } from "react-icons/fa";
import { Slide } from "../../../types/Slide";
import { getPublicSlides } from "../../../services/slideService";
import Loading from "../../../components/Loading";
const FashionSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    let interval;
    if (!isLoading) {
      interval = setInterval(nextSlide, 5000);
    }
    return () => clearInterval(interval);
  }, [isLoading, nextSlide]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const res: Slide[] = await getPublicSlides();
      setSlides(res);
      setIsLoading(false);
    })();
  }, []);
  if (isLoading)
    return (
      <div className="relative h-[400px] md:h-[600px] bg-white">
        <Loading />
      </div>
    );
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
              <h2 className="text-2xl font-bold lg:visible invisible">
                {slide.title}
              </h2>
              <p className="text-sm lg:visible invisible">
                {slide.description}
              </p>
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
