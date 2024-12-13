import React, { useState, useEffect } from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { RiFilter3Line } from "react-icons/ri";
import ProductDisplay from "../../components/ProductDisplay";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [brands, setBrands] = useState([]);

  const productsPerPage = 12;

  useEffect(() => {
    // Simulating API call to fetch products
    const fetchProducts = () => {
      const dummyProducts = Array.from({ length: 50 }, (_, index) => ({
        id: index + 1,
        name: `Product ${index + 1}`,
        price: Math.floor(Math.random() * 1000) + 1,
        brand: `Brand ${Math.floor(Math.random() * 5) + 1}`,
        image: `https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1399&q=80`,
      }));
      setProducts(dummyProducts);

      const uniqueBrands = [...new Set(dummyProducts.map((product) => product.brand))];
      setBrands(uniqueBrands);
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.price >= priceRange[0] &&
      product.price <= priceRange[1] &&
      (selectedBrand === "" || product.brand === selectedBrand)
  );

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortBy === "name") {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else {
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
    }
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const handlePriceRangeChange = (e) => {
    const selectedRange = e.target.value;
    const [min, max] = selectedRange.split("-").map(Number);
    setPriceRange([min, max]);
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
                  value={`${priceRange[0]}-${priceRange[1]}`}
                  onChange={handlePriceRangeChange}
                >
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
                  }}
                >
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

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.brand}</p>
              <p className="text-blue-600 font-bold">${product.price}</p>
            </div>
          </div>
        ))}
      </div> */}
      <ProductDisplay />

      
    </div>
  );
};

export default Products;
