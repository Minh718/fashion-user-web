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
import { Product } from "../../types/Product";
import { notifyError } from "../../components/toastNotify";
import LoadingBigger from "../../components/LoadingBigger";
import Loading from "../../components/Loading";
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

const Products = () => {
  let { thump } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedBrand, setSelectedBrand] = useState("");
  const [sortBy, setSortBy] = useState("createdDate");
  const [sortOrder, setSortOrder] = useState("desc");
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    // Simulating API call to fetch products
    setIsLoading(true);
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
        setIsLoading(false);
      } catch (error) {
        notifyError("Error occur");
      }
    };
    fetchProducts();
  }, [minPrice, maxPrice, sortBy, sortOrder, currentPage, thump]);

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

  // if (isLoading) return <LoadingBigger />;
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
      <div
        className={`container mx-auto px-4 py-2 max-w-full bg-white min-h-[70vh]`}
      >
        <h1 className="text-4xl font-bold text-center mb-4 p-3">{thump}</h1>
        <div className="min-h-[50vh] flex items-center justify-center">
          {isLoading ? (
            <Loading />
          ) : products.length === 0 ? (
            <div className="text-center">No results found</div>
          ) : (
            <ProductDisplay products={products} />
          )}
        </div>
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
