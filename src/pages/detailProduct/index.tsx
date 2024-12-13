import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaStar, FaShoppingCart, FaHeart } from "react-icons/fa";
import Breadcrumbs from "../../components/Breadcrumbs";
import ProductsSlide from "../homePage/components/ProductsSlide";
const links = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Products",
    url: "/products",
  },
  {
    name: "Detail product",
    url: "/#",
  },
];
const ProductDetailPage = () => {
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Blue");

  const product = {
    name: "Premium Denim Jacket",
    price: 129.99,
    discount: 15,
    brand: "DenimCo",
    subCategory: "Outerwear",
    description:
      "This premium denim jacket is crafted with high-quality materials for durability and style. Perfect for casual outings and layering.",
    material: "100% Cotton Denim",
    origin: "USA",
    warranty: "1 Year",
    madeIn: "Los Angeles, CA",
    model: "DC-2023",
    sizes: [
      { size: "S", quantity: 5 },
      { size: "M", quantity: 10 },
      { size: "L", quantity: 8 },
      { size: "XL", quantity: 3 },
    ],
    colors: [
      { name: "Blue", hex: "#1E90FF", quantity: 15 },
      { name: "Black", hex: "#000000", quantity: 10 },
      { name: "Gray", hex: "#808080", quantity: 8 },
    ],
    images: [
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
      "https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80",
      "https://images.unsplash.com/photo-1548126032-079a0fb0099d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80",
    ],
    rating: 4.5,
    reviews: 128,
  };

  const discountedPrice = product.price * (1 - product.discount / 100);

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <Breadcrumbs links={links} />
      <div className="flex flex-col md:flex-row ">
        <div className="md:w-1/3">
          <Carousel
            showArrows={true}
            showStatus={false}
            showThumbs={true}
            infiniteLoop={true}
            className="product-carousel"
          >
            {product.images.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="md:w-1/2 md:pl-8 mt-8 md:mt-0">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <div className="flex items-center mb-4">
            <span className="text-2xl font-semibold mr-2">
              ${discountedPrice.toFixed(2)}
            </span>
            {product.discount > 0 && (
              <span className="text-lg text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
            {product.discount > 0 && (
              <span className="ml-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                {product.discount}% OFF
              </span>
            )}
          </div>
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={
                    i < Math.floor(product.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <span className="text-gray-600">{product.reviews} reviews</span>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Select Size</h2>
            <div className="flex space-x-2">
              {product.sizes.map((sizeObj) => (
                <button
                  key={sizeObj.size}
                  className={`px-4 py-2 border rounded-md ${
                    selectedSize === sizeObj.size
                      ? "bg-blue-500 text-white"
                      : "bg-white text-black"
                  }`}
                  onClick={() => setSelectedSize(sizeObj.size)}
                  aria-label={`Select size ${sizeObj.size}`}
                >
                  {sizeObj.size}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Select Color</h2>
            <div className="flex space-x-2">
              {product.colors.map((colorObj) => (
                <button
                  key={colorObj.name}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === colorObj.name
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: colorObj.hex }}
                  onClick={() => setSelectedColor(colorObj.name)}
                  aria-label={`Select color ${colorObj.name}`}
                />
              ))}
            </div>
          </div>
          <div className="flex space-x-4 mb-8">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-md flex items-center justify-center hover:bg-blue-600 transition duration-300">
              <FaShoppingCart className="mr-2" />
              Add to Cart
            </button>
            <button className="border border-gray-300 px-6 py-3 rounded-md flex items-center justify-center hover:bg-gray-100 transition duration-300">
              <FaHeart className="mr-2" />
              Add to Wishlist
            </button>
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Product Details</h2>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <ul className="text-gray-700">
              <li>
                <strong>Material:</strong> {product.material}
              </li>
              <li>
                <strong>Origin:</strong> {product.origin}
              </li>
              <li>
                <strong>Warranty:</strong> {product.warranty}
              </li>
              <li>
                <strong>Made in:</strong> {product.madeIn}
              </li>
              <li>
                <strong>Model:</strong> {product.model}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-center">
        Products you may be interested in
      </h3>
      <ProductsSlide />
    </div>
  );
};

export default ProductDetailPage;
