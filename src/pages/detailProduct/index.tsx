import React, { useCallback, useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { FaStar, FaShoppingCart, FaHeart } from "react-icons/fa";
import Breadcrumbs from "../../components/Breadcrumbs";
import ProductsSlide from "../homePage/components/ProductsSlide";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { ProductSizeColor } from "../../types/ProductSizeColor";
import { ProductDetails } from "../../types/ProductDetails";
import {
  getProductDetail,
  getRelatedProducts,
} from "../../services/productService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { notifyError, notifySuccess } from "../../components/toastNotify";
import { setStatusCart } from "../../store/user/userSlice";
import { addProductToCart } from "../../services/cartService";
import LoadingBigger from "../../components/LoadingBigger";
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
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [productSizeColors, setProductSizeColors] = React.useState<
    ProductSizeColor[]
  >([]);
  const [productSizeColor, setProductSizeColor] =
    React.useState<ProductSizeColor | null>(null);
  let { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state: RootState) => state.user);
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
  const handleAddProductToCart = async () => {
    if (isAuthenticated === null) {
      navigate("/signin");
    } else {
      try {
        if (productSizeColor && quantity > 0) {
          const data = {
            productSizeColorId: productSizeColor.id,
            quantity: quantity,
          };
          await addProductToCart(data);
          notifySuccess("Add product to cart successfully");
          dispatch(setStatusCart(true));
          // navigate('/cart')
        }
      } catch (error) {
        notifyError(error.response.data.message);
      }
    }
  };
  const handleChangeQuantity = (event) => {
    setQuantity(event.target.value);
  };

  const fetchProductData = useCallback(async (id, navigate) => {
    try {
      const [productDetailrt, relatedProductsrt] = await Promise.all([
        getProductDetail(id),
        getRelatedProducts(id),
      ]);
      for (let i = 0; i < productDetailrt.productSizes.length; i++) {
        if (productDetailrt.productSizes[i].quantity > 0) {
          setProductSize({
            id: productDetailrt.productSizes[i].id,
            size: productDetailrt.productSizes[i].size,
          });
          setProductSizeColors(
            productDetailrt.productSizes[i].productSizeColors
          );
          for (
            let j = 0;
            j < productDetailrt.productSizes[i].productSizeColors.length;
            j++
          ) {
            if (
              productDetailrt.productSizes[i].productSizeColors[j].quantity > 0
            ) {
              setProductSizeColor(
                productDetailrt.productSizes[i].productSizeColors[j]
              );
              break;
            }
          }
          break;
        }
      }
      setRelatedProducts(relatedProductsrt);
      setProductDetails(productDetailrt);
      // Handle state updates here (assuming you have state setters)
      // setProductDetail(productDetail);
      // setRelatedProducts(relatedProducts);
    } catch (error) {
      navigate("/404");
    }
  }, []);
  useEffect(() => {
    fetchProductData(id, navigate);
  }, [id, fetchProductData]);
  if (productDetails === null) return <LoadingBigger />;
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
                      style={{ backgroundColor: item.color.code }}
                    ></div>
                  ) : (
                    <div
                      key={item.id}
                      className="w-[30px] cursor-not-allowed h-[30px] rounded-full opacity-50"
                      style={{ backgroundColor: item.color.code }}
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
            <button
              onClick={handleAddProductToCart}
              className="bg-blue-500 text-white px-6 py-3 rounded-md flex items-center justify-center hover:bg-blue-600 transition duration-300"
            >
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
      <ProductsSlide products={relatedProducts} />
    </div>
  );
};

export default ProductDetailPage;
