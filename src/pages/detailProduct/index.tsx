import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaStar, FaShoppingCart, FaHeart } from "react-icons/fa";
import Breadcrumbs from "../../components/Breadcrumbs";
import ProductsSlide from "../homePage/components/ProductsSlide";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { ProductSizeColor } from "../../types/ProductSizeColor";
import { ProductDetails } from "../../types/ProductDetails";
import { getProductDetail } from "../../services/productService";
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
const products2 = [
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
const product2 = {
  id: 12,
  name: "Premium Denim Jacket",
  price: 129.99,
  percent: 15,
  brand: {
    name: "DenimCo",
  },
  subCategory: {
    name: "Outerwear",
  },
  image: "https://picsum.photos/200/300",
  description:
    "This premium denim jacket is crafted with high-quality materials for durability and style. Perfect for casual outings and layering.",
  productSizes: [
    {
      id: 1,
      quantity: 0,
      size: {
        name: "XL",
      },
      productSizeColors: [
        {
          id: 2,
          quantity: 0,
          color: {
            id: 2,
            name: "RED",
            color: "#4D55CC",
          },
        },
        {
          id: 4,
          quantity: 0,
          color: {
            id: 2,
            name: "YELLOW",
            color: "#CCC",
          },
        },
      ],
    },
    {
      id: 3,
      quantity: 30,
      size: {
        name: "XXL",
      },
      productSizeColors: [
        {
          id: 2,
          quantity: 12,
          color: {
            id: 2,
            name: "RED",
            color: "#205781",
          },
        },
        {
          id: 4,
          quantity: 233,
          color: {
            id: 3,
            name: "YELLOW",
            color: "#255F38",
          },
        },
      ],
    },
  ],
  detailProduct: {
    description: "MCve",
    material: "VAI",
    origin: "CHINA",
    warranty: "2 years",
    madeIn: "VN",
    model: "HIENDAI",
    images: [
      "https://picsum.photos/200/300",
      "https://picsum.photos/200/301",
      "https://picsum.photos/200/302",
    ],
  },
  rating: 4.5,
  reviews: 128,
};
interface ProductSize {
  id: number;
  size: any;
}
const ProductDetailPage = () => {
  const [productDetails, setProductDetails] =
    React.useState<ProductDetails | null>(null);
  const [quantity, setQuantity] = React.useState(1);
  const [productSize, setProductSize] = React.useState<ProductSize | null>(
    null
  );
  const [productSizeColors, setProductSizeColors] = React.useState<
    ProductSizeColor[]
  >([]);
  const [productSizeColor, setProductSizeColor] =
    React.useState<ProductSizeColor | null>(null);
  let { id } = useParams();
  const navigate = useNavigate();

  const handleChangeProductSize = (item) => {
    if (item.id !== productSize?.id) {
      setProductSize({ id: item.id, size: item.size });
      setProductSizeColors(item.productSizeColors);
      setQuantity(1);
      for (let i = 0; i < item.productSizeColors.length; i++) {
        if (item.productSizeColors[i].quantity > 0) {
          setProductSizeColor(item.productSizeColors[i]);
          break;
        }
      }
    }
  };

  const handleChangeQuantity = (event) => {
    setQuantity(event.target.value);
  };
  useEffect(() => {
    (async () => {
      try {
        const res = await getProductDetail(id);
        for (let i = 0; i < res.productSizes.length; i++) {
          if (res.productSizes[i].quantity > 0) {
            console.log(res.productSizes[i]);
            setProductSize({
              id: res.productSizes[i].id,
              size: res.productSizes[i].size,
            });
            setProductSizeColors(res.productSizes[i].productSizeColors);
            for (
              let j = 0;
              j < res.productSizes[i].productSizeColors.length;
              j++
            ) {
              if (res.productSizes[i].productSizeColors[j].quantity > 0) {
                setProductSizeColor(res.productSizes[i].productSizeColors[j]);
                break;
              }
            }
            break;
          }
        }
        setProductDetails(product2);
      } catch (error) {
        navigate("/404");
      }
    })();
  }, [id]);

  if (productDetails === null) return <Loading />;
  const discountedPrice =
    productDetails.price * (1 - productDetails.percent / 100);
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
            <div key={productDetails.id}>
              <img
                src={productDetails.image}
                alt={`Product ${productDetails.id + 1}`}
                className="object-cover w-full h-full"
              />
            </div>
            {productDetails.detailProduct.images.map((image, index) => (
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
          <h1 className="text-3xl font-bold mb-4">{productDetails.name}</h1>
          <div className="flex items-center mb-4">
            <span className="text-2xl font-semibold mr-2">
              ${discountedPrice.toFixed(2)}
            </span>
            {productDetails.percent > 0 && (
              <span className="text-lg text-gray-500 line-through">
                ${productDetails.price.toFixed(2)}
              </span>
            )}
            {productDetails.percent > 0 && (
              <span className="ml-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                {productDetails.percent}% OFF
              </span>
            )}
          </div>
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={
                    i < Math.floor(productDetails.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <span className="text-gray-600">
              {productDetails.reviews} reviews
            </span>
          </div>
          {/* <div className="mb-6">
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
          </div> */}

          {/* <div className="m-6"></div> */}
          <div className="m-6">
            {productDetails?.productSizes?.length > 1 && (
              <div className="mb-3">
                <h2 className="text-lg font-semibold mb-2">Select Size:</h2>
                <div className="flex flex-wrap gap-2">
                  {productDetails?.productSizes?.map((item) => {
                    return item.quantity > 0 ? (
                      <div
                        key={item.id}
                        onClick={() => handleChangeProductSize(item)}
                        className={`cursor-pointer flex items-center justify-center mb-2 mr-2 min-w-[40px] px-1 h-[40px] rounded-md ${
                          item.id === productSize?.id
                            ? "border-red-500 border-4"
                            : "border-black opacity-85 border-2"
                        }`}
                      >
                        {item?.size.name}
                      </div>
                    ) : (
                      <div
                        key={item.id}
                        className={`cursor-not-allowed opacity-50 flex items-center justify-center mb-2 mr-2 px-1 min-w-[40px] h-[40px] rounded-md border-black border-2`}
                      >
                        {item?.size.name}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {productSize === null ? (
              ""
            ) : (
              <>
                <div>
                  <span className="mr-5">
                    <span className="font-medium opacity-80    ">Size:</span>{" "}
                    <span className="font-normal italic">
                      {productSize?.size?.name}
                    </span>
                  </span>
                  <span className="font-medium opacity-80    ">Color:</span>{" "}
                  <span className="font-normal italic">
                    {productSizeColor?.color?.name}
                  </span>
                </div>
                <div>
                  <span className="font-medium opacity-80    ">
                    Số lượng còn lại:
                  </span>{" "}
                  <span className="font-normal italic">
                    {productSizeColor?.quantity}
                  </span>
                </div>
              </>
            )}
            <div className="mb-3">
              <h2 className="text-lg font-semibold mb-2">Select Color:</h2>
              <div className="flex flex-wrap gap-2">
                {productSizeColors?.map((item) => {
                  return item.quantity > 0 ? (
                    <div
                      key={item.id}
                      onClick={() => {
                        setQuantity(1);
                        setProductSizeColor(item);
                      }}
                      className={`${
                        productSizeColor?.id === item.id
                          ? "border-2 bg-clip-content"
                          : ""
                      } shadow-inner p-[1px] w-[30px] h-[30px] rounded-full cursor-pointer  border-red-600`}
                      style={{ backgroundColor: item.color.color }}
                    ></div>
                  ) : (
                    <div
                      key={item.id}
                      className="w-[30px] cursor-not-allowed h-[30px] rounded-full opacity-50"
                      style={{ backgroundColor: item.color.color }}
                    ></div>
                  );
                })}
              </div>
            </div>
            <div className="mb-3">
              <h2 className="text-lg font-semibold mb-2">Quantity:</h2>
              <div>
                {productSize === null ? (
                  <h1 className="text-red-600 font-medium">
                    This product is out of stock. I sorry about that
                  </h1>
                ) : (
                  <div className="flex">
                    <label
                      htmlFor="select-quantity-detailproduct"
                      id="label-quantity-product"
                    >
                      Quantity
                    </label>
                    <select
                      id="select-quantity-detailproduct"
                      value={quantity}
                      onChange={handleChangeQuantity}
                    >
                      {Array.from(
                        { length: productSizeColor?.quantity ?? 0 },
                        (_, index) => index + 1
                      ).map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
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
            <p className="text-gray-700 mb-4">
              {productDetails.detailProduct.description}
            </p>
            <ul className="text-gray-700">
              <li>
                <strong>Material:</strong>{" "}
                {productDetails.detailProduct.material}
              </li>
              <li>
                <strong>Origin:</strong> {productDetails.detailProduct.origin}
              </li>
              <li>
                <strong>Warranty:</strong>{" "}
                {productDetails.detailProduct.warranty}
              </li>
              <li>
                <strong>Made in:</strong> {productDetails.detailProduct.madeIn}
              </li>
              <li>
                <strong>Model:</strong> {productDetails.detailProduct.model}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-center">
        Products you may be interested in
      </h3>
      <ProductsSlide products={products2} />
    </div>
  );
};

export default ProductDetailPage;
