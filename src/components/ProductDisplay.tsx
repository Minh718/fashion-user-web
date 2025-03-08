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
import { Product } from "../types/Product";
const ProductDisplay = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
    <>
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
                  // onClick={() => handleBuy(product)}
                  onClick={() => handleViewDetails(product)}
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
    </>
  );
};

export default ProductDisplay;
