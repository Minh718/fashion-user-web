import React, { useState, useEffect } from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { RiFilter3Line } from "react-icons/ri";
import ProductDisplay from "../../components/ProductDisplay";
import Pagination from "../../components/Pagination";
import { useLoaderData, useParams } from "react-router-dom";
import { Metadata } from "../../types/Metadata";
import {
  getPublicProducts,
  getPublicProductsBySubCategory,
} from "../../services/productService";
const moneyFilter = [
  {
    from: 0,
    to: 200,
  },
  {
    from: 200,
    to: 400,
  },
  {
    from: 400,
    to: 600,
  },
  {
    from: 600,
    to: 800,
  },
  {
    from: 1000,
    to: 1200,
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
const Products = () => {
  let { thump } = useParams();
  // const { metadata: data, result } = useLoaderData() as {
  //   metadata: Metadata;
  //   result: any[];
  // };

  const [products, setProducts] = useState(products2);
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  const [selectedBrand, setSelectedBrand] = useState("");
  const [sortBy, setSortBy] = useState("createdDate");
  const [sortOrder, setSortOrder] = useState("desc");
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    // Simulating API call to fetch products
    const fetchProducts = async () => {
      let res;
      try {
        if (thump === "news") {
          res = await getPublicProducts({
            sortBy: sortBy,
            order: sortOrder,
            page: currentPage,
            minPrice,
            maxPrice,
            size: 20,
          });
        } else {
          res = await getPublicProductsBySubCategory({
            thump,
            sortBy: sortBy,
            order: sortOrder,
            page: currentPage,
            minPrice,
            maxPrice,
            size: 20,
          });
        }
        setProducts(res.result);
        setMetadata(res.metadata);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, [minPrice, maxPrice, sortBy, sortOrder, currentPage]);

  const handlePriceRangeChange = (e) => {
    const selectedRange = e.target.value;
    setCurrentPage(0);
    if (selectedRange === "all") {
      setMinPrice(null);
      setMaxPrice(null);
    } else {
      const [min, max] = selectedRange.split("-").map(Number);
      setMinPrice(min);
      setMaxPrice(max);
    }
  };

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
  };

  const handleSortChange = (newSortBy) => {
    if (newSortBy === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(newSortBy);
      setSortOrder("asc");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="w-full md:w-auto flex items-center gap-4">
              <h2 className="text-xl font-semibold flex items-center">
                <RiFilter3Line className="mr-2" /> Filters
              </h2>
              <div className="w-full md:w-40">
                <select
                  className="w-full px-2 py-1 border rounded"
                  value={minPrice === null ? "all" : `${minPrice}-${maxPrice}`}
                  onChange={handlePriceRangeChange}
                >
                  <option value="all">All</option>
                  <option value="0-200">$0 - $200</option>
                  <option value="200-400">$200 - $400</option>
                  <option value="400-600">$400 - $600</option>
                  <option value="600-800">$600 - $800</option>
                  <option value="800-1000">$800 - $1000</option>
                </select>
              </div>
              <div className="w-full md:w-40">
                <select
                  className="w-full px-2 py-1 border rounded"
                  value={selectedBrand}
                  onChange={handleBrandChange}
                >
                  <option value="">All Brands</option>
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="w-full md:w-auto">
              <div className="relative">
                <select
                  className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 leading-tight focus:outline-none focus:ring focus:border-blue-300"
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [newSortBy, newSortOrder] = e.target.value.split("-");
                    setSortBy(newSortBy);
                    setSortOrder(newSortOrder);
                    setCurrentPage(0);
                  }}
                >
                  <option value="createdDate-desc">
                    Date created (to past)
                  </option>
                  <option value="createdDate-asc">
                    Date created (to future)
                  </option>
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                  <option value="price-asc">Price (Low to High)</option>
                  <option value="price-desc">Price (High to Low)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`container mx-auto px-4 py-2 max-w-full bg-white`}>
        <h1 className="text-4xl font-bold text-center mb-4 p-1">{thump}</h1>
        <ProductDisplay products={products} />
        <div className="flex justify-end items-center px-4 py-2">
          <Pagination
            pageCount={metadata?.totalPages ?? 6}
            handlePageClick={({ selected }) => setCurrentPage(selected)}
            page={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
