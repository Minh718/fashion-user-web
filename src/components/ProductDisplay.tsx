import React, { useState, useEffect } from "react";
import {
  FaShoppingCart,
  FaInfoCircle,
  FaPercent,
  FaStar,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";

const ProductDisplay = () => {
  interface Product {
    id: number;
    name: string;
    price: number;
    percent: number;
    rating: number;
    image: string;
  }

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const products = [
    {
      id: 1,
      name: "Wireless Headphones trendy accessoriess ICONDENIM",
      price: 129.99,
      percent: 10,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc",
    },
    {
      id: 2,
      name: "Áo Thun Nam ICONDENIM  trendy Capybara",
      price: 199.99,
      percent: 15,
      rating: 4.2,
      image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e",
    },
    {
      id: 3,
      name: "Áo Thun Nam ICONDENIM Cotton Basic Leon",
      price: 999.99,
      percent: 5,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
    },
    {
      id: 4,
      name: "Áo Thun Nam Training trendy RUNPOW LightWeight",
      price: 699.99,
      percent: 20,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
    },
    {
      id: 5,
      name: "Áo Polo Nam ICONDENIM Basic With Logo",
      price: 89.99,
      percent: 25,
      rating: 4.3,
      image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
    },
    {
      id: 6,
      name: "Quần Short Bơi Nam ICONDENIM All-Day Beach",
      price: 349.99,
      percent: 8,
      rating: 4.4,
      image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
    },
    {
      id: 7,
      name: "Áo Sweatshirt Nam ICONDENIM Heroic Doberman",
      price: 499.99,
      percent: 12,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
    },
    {
      id: 8,
      name: "Áo Thun Nam ICONDENIM Trust The Process",
      price: 79.99,
      percent: 18,
      rating: 4.1,
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
    },
    {
      id: 15,
      name: "Áo Polo Nam ICONDENIM Basic With Logo",
      price: 59.99,
      percent: 25,
      rating: 4.3,
      image:
        "https://images.unsplash.com/photo-1590658165737-15a047b7c0b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
    },
    {
      id: 55,
      name: "Quần Short Bơi Nam ICONDENIM All-Day Beach",
      price: 35.99,
      percent: 8,
      rating: 4.4,
      image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
    },
    {
      id: 57,
      name: "Áo Sweatshirt Nam ICONDENIM Heroic Doberman",
      price: 491.99,
      percent: 12,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
    },
    {
      id: 8,
      name: "Áo Thun Nam ICONDENIM Trust The Process",
      price: 79.39,
      percent: 18,
      rating: 4.1,
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
    },
    {
      id: 28,
      name: "Áo Thun Nam ICONDENIM Trust The Process",
      price: 79.99,
      percent: 18,
      rating: 4.1,
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
    },
    {
      id: 19,
      name: "Áo Polo Nam ICONDENIM Basic With Logo",
      price: 59.99,
      percent: 25,
      rating: 4.3,
      image:
        "https://images.unsplash.com/photo-1590658165737-15a047b7c0b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
    },
    {
      id: 33,
      name: "Quần Short Bơi Nam ICONDENIM All-Day Beach",
      price: 35.99,
      percent: 8,
      rating: 4.4,
      image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
    },
  ];

  const handleBuy = (product) => {
    console.log(`Buying ${product.name}`);
    // Implement buy functionality here
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const calculateDiscountedPrice = (price, percent) => {
    return price - (price * percent) / 100;
  };

  return (
    <div className={`container mx-auto px-4 py-2 max-w-full bg-white`}>
      <h1 className="text-4xl font-bold text-center mb-4 p-1">
        Newest Products
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white  rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:scale-105 mx-auto"
          >
            <div className="relative">
              <img
                src={"https://picsum.photos/200/300"}
                alt={product.name}
                className="w-52 h-40 object-cover"
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
                  $
                  {calculateDiscountedPrice(
                    product.price,
                    product.percent
                  ).toFixed(2)}
                </span>
                <span className="text-sm text-gray-500  line-through">
                  ${product.price.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => handleBuy(product)}
                  className="bg-blue-600  text-white px-3 py-1 rounded-full hover:bg-blue-700 transition-colors duration-300 flex items-center text-sm"
                >
                  <FaShoppingCart className="mr-1" /> Buy
                </button>
                <Link
                  to={"/product/1"}
                  // onClick={() => handleViewDetails(product)}
                  className="bg-gray-200  text-gray-800  px-3 py-1 rounded-full hover:bg-gray-300 transition-colors duration-300 flex items-center text-sm"
                >
                  <FaInfoCircle className="mr-1" /> Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white  rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 ">{selectedProduct.name}</h2>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-64 object-cover mb-4 rounded"
            />
            <div className="flex items-center mb-4">
              <div className="flex items-center text-yellow-400 mr-2">
                <FaStar />
                <span className="ml-1 text-lg font-medium">
                  {selectedProduct.rating}
                </span>
              </div>
              <span className="text-gray-500 ">
                ({Math.floor(Math.random() * 1000)} reviews)
              </span>
            </div>
            <p className="text-xl font-bold mb-2 ">
              Original Price:{" "}
              <span className="line-through text-gray-500 ">
                ${selectedProduct.price.toFixed(2)}
              </span>
            </p>
            <p className="text-lg text-green-600  font-semibold mb-2">
              Discount: {selectedProduct.percent}% off
            </p>
            <p className="text-2xl font-bold mb-4 ">
              Final Price: $
              {calculateDiscountedPrice(
                selectedProduct.price,
                selectedProduct.percent
              ).toFixed(2)}
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => handleBuy(selectedProduct)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300"
              >
                Buy Now
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-200  text-gray-800  px-4 py-2 rounded hover:bg-gray-300  transition-colors duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-end items-center px-4 py-2">
        <Pagination pageCount={10} handlePageClick={null} />
      </div>
    </div>
  );
};

export default ProductDisplay;
