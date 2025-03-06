import React from "react";
import { FaHome, FaSearch } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 text-center">
        <div className="animate-bounce">
          <h1 className="text-9xl font-extrabold text-blue-600">404</h1>
        </div>
        <h2 className="mt-6 text-3xl font-bold text-gray-900">
          Oops! This page doesn't exist
        </h2>
        <p className="mt-2 text-lg text-gray-600">
          The page you're looking for might have been moved or doesn't exist.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            <FaHome className="mr-2" />
            Back to Homepage
          </a>
        </div>
        <div className="mt-6">
          <div className="relative">
            <input
              type="text"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search for content..."
            />
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 focus:outline-none"
              aria-label="Search"
            >
              <FaSearch />
            </button>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900">
            Try these links:
          </h3>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out"
            >
              Popular Products
            </a>
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out"
            >
              Recent Blog Posts
            </a>
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out"
            >
              About Us
            </a>
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
