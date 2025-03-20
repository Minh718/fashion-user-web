import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { searchProducts } from "../services/productService";
const dummyData = [
  {
    id: 1,
    name: "Wireless Bluetooth Earbuds",
    price: 79.99,
    percent: 20,
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZWFyYnVkc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    createdDate: "2023-05-01T10:30:00Z",
  },
  {
    id: 2,
    name: "Smart Watch Series 5",
    price: 299.99,
    percent: 15,
    image:
      "https://images.unsplash.com/photo-1544117519-31a4b719d2d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    createdDate: "2023-04-28T14:45:00Z",
  },
  {
    id: 3,
    name: "4K Ultra HD Smart TV",
    price: 799.99,
    percent: 10,
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c21hcnQlMjB0dnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    createdDate: "2023-05-02T09:15:00Z",
  },
];
export default function FieldSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(dummyData);
  const [size, setSize] = useState(5);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleItemClick = (item) => {
    setSearchQuery("");
    navigate(`/product/${item.id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (searchQuery.trim() === "") {
        setSearchResults([]);
        return;
      }
      setLoading(true);
      try {
        const data = await searchProducts({ query: searchQuery });
        setSearchResults(data.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    // Debouncing: Delay the fetch until the user has stopped typing for 300ms
    const handler = setTimeout(() => {
      fetchData();
    }, 300);

    // Cleanup function to cancel the previous timeout
    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search products..."
        className="w-full py-2 px-4 rounded-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
        aria-label="Search products"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-blue-500 focus:outline-none"
        aria-label="Search"
      >
        <FaSearch />
      </button>
      {searchQuery && (
        <div className="absolute w-full mt-2 top-full max-h-[80vh] overflow-y-scroll bg-white rounded-lg shadow-lg overflow-hidden z-40">
          {searchResults.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {searchResults.map((item) => (
                <li
                  key={item.id}
                  className="p-4 hover:bg-gray-50 cursor-pointer transition duration-150 ease-in-out"
                  onClick={() => handleItemClick(item)}
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <p className="text-lg font-bold text-gray-900">
                          ${(item.price * (1 - item.percent / 100)).toFixed(2)}
                        </p>
                        {item.percent > 0 && (
                          <p className="text-sm text-gray-500 line-through">
                            ${item.price.toFixed(2)}
                          </p>
                        )}
                        {item.percent > 0 && (
                          <span className="text-sm font-semibold text-green-600">
                            {item.percent}% off
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        Created on {new Date(item.createdDate).toDateString()}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-4 text-gray-500">No results found</p>
          )}
          {searchResults.length > size && ( // Show "View more" button if there are more results
            <Link to={"products/search?query=" + searchQuery}>
              <p
                onClick={() => setSearchQuery("")}
                className="block p-4 text-center text-blue-500 font-semibold"
              >
                View more
              </p>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
