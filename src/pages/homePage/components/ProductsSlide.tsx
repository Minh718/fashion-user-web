import React, { useState, useEffect } from "react";
import { FaInfoCircle, FaShoppingCart, FaStar } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const ProductsSlide = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(1); // Track how many items are visible

  // Function to detect the screen size and update itemsPerSlide
  const handleResize = () => {
    if (window.innerWidth >= 1280) {
      setItemsPerSlide(4); // For large screens
    } else if (window.innerWidth >= 1024) {
      setItemsPerSlide(3); // For large screens
    } else if (window.innerWidth >= 768) {
      setItemsPerSlide(2); // For medium screens
    } else {
      setItemsPerSlide(1); // For small screens
    }
  };

  useEffect(() => {
    handleResize(); // Set initial value based on screen size
    window.addEventListener("resize", handleResize); // Update on resize
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       nextSlide();
  //     }, 10000);
  //     return () => clearInterval(interval);
  //   }, [currentIndex, itemsPerSlide]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerSlide >= products.length
        ? 0
        : prevIndex + itemsPerSlide
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? products.length - itemsPerSlide
        : prevIndex - itemsPerSlide
    );
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${(currentIndex / itemsPerSlide) * 100}%)`,
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-4 py-8 md:px-8"
          >
            <div
              key={product.id}
              className="bg-white max-w-[300px]  rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:scale-105 mx-auto"
            >
              <div className="relative">
                <img
                  src={"https://picsum.photos/200/300"}
                  alt={product.name}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute top-2 right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full">
                  {product.percent}% OFF
                </div>
              </div>
              <div className="p-3">
                <h2 className="text-lg font-semibold mb-1 truncate text-wrap">
                  {product.name}
                </h2>
                <div className="flex items-center mb-1">
                  <div className="flex items-center text-yellow-400 mr-2">
                    <FaStar />
                    <span className="ml-1 text-sm font-medium">
                      {product.rating}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 ">
                    ({Math.floor(Math.random() * 1000)} reviews)
                  </span>
                </div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-lg font-bold text-gray-900 ">
                    {/* ${calculateDiscountedPrice(product.price, product.percent).toFixed(2)} */}
                    500$
                  </span>
                  <span className="text-sm text-gray-500  line-through">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <button
                    //   onClick={() => handleBuy(product)}
                    className="bg-blue-600  text-white px-3 py-1 rounded-full hover:bg-blue-700 transition-colors duration-300 flex items-center text-sm"
                  >
                    <FaShoppingCart className="mr-1" /> Buy
                  </button>
                  <button
                    //   onClick={() => handleViewDetails(product)}
                    className="bg-gray-200  text-gray-800  px-3 py-1 rounded-full hover:bg-gray-300 transition-colors duration-300 flex items-center text-sm"
                  >
                    <FaInfoCircle className="mr-1" /> Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow-md hover:bg-opacity-75 transition-all duration-300"
        aria-label="Previous voucher"
      >
        <IoIosArrowBack className="text-2xl text-gray-800" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full shadow-md hover:bg-opacity-75 transition-all duration-300"
        aria-label="Next voucher"
      >
        <IoIosArrowForward className="text-2xl text-gray-800" />
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {Array.from({ length: Math.ceil(products.length / itemsPerSlide) }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * itemsPerSlide)}
              className={`w-3 h-3 rounded-full ${
                Math.floor(currentIndex / itemsPerSlide) === index
                  ? "bg-blue-500"
                  : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          )
        )}
      </div>
    </div>
  );
};

export default ProductsSlide;
