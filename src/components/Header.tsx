import React, { useEffect, useState } from "react";
import {
  FaSearch,
  FaUser,
  FaShoppingCart,
  FaBars,
  FaBell,
  FaSignOutAlt,
  FaClipboardList,
  FaInfoCircle,
  FaAngleDown,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, Router } from "react-router-dom";
import { RootState } from "../store";
import FieldSearch from "./FieldSearch";
import { getAllCategories } from "../services/categoryService";
const categories2 = [
  {
    id: 1,
    name: "Clothing",
    subcategories: [
      {
        id: 2,
        name: "AOTHUN",
        thump: "OKE",
      },
    ],
  },
  {
    id: 1,
    name: "Accessories",
    subcategories: [
      {
        id: 2,
        name: "AOTHUN",
        thump: "OKE",
      },
    ],
  },
  {
    id: 1,
    name: "Home & Garden",
    subcategories: [
      {
        id: 2,
        name: "AOTHUN",
        thump: "OKE",
      },
    ],
  },
  {
    id: 1,
    name: "Beauty",
    subcategories: [
      {
        id: 2,
        name: "AOTHUN",
        thump: "OKE",
      },
    ],
  },
];

const Header = () => {
  const [hoveredCategory, setHoveredCategory] = useState<String | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [categories, setCategories] = React.useState(categories2);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { isAuthenticated, userInfo } = useSelector(
    (state: RootState) => state.user
  );
  const notifications = [
    { id: 1, message: "New product arrival!" },
    { id: 2, message: "Your order has been shipped" },
    { id: 3, message: "Flash sale starting soon" },
  ];
  // useEffect(() => {
  //   (async () => {
  //     const data = await getAllCategories();
  //     setCategories(data);
  //   })();
  // }, []);
  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <div className="flex items-center justify-between">
          <Link to="/">
            <div className="flex items-center space-x-4">
              <img src="/public/logo.jpg" alt="Logo" className="h-14 w-auto" />
              <h1 className="text-2xl font-bold">ShopEase</h1>
            </div>
          </Link>
          <div className="hidden md:flex flex-1 mx-8 max-w-md">
            <FieldSearch />
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div
                className="text-2xl hover:text-blue-200 cursor-pointer flex flex-col justify-center items-center focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-full p-1"
                aria-label="Notifications"
                onClick={() => setNotificationOpen(!notificationOpen)}
              >
                <FaBell />
                <span className="hidden sm:block text-sm">Nofications</span>
              </div>
              {notificationOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    {notifications.map((notification) => (
                      <a
                        key={notification.id}
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                      >
                        {notification.message}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              {isAuthenticated ? (
                <div
                  className="text-2xl hover:text-blue-200 cursor-pointer flex flex-col justify-center items-center focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-full p-1"
                  aria-label="User menu"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <FaUser />
                  <span className="hidden sm:block text-sm">
                    Hi, {userInfo?.name}
                  </span>
                </div>
              ) : (
                <Link
                  to={"/signin"}
                  className="text-2xl hover:text-blue-200 cursor-pointer flex flex-col justify-center items-center focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-full p-1"
                  aria-label="User menu"
                >
                  <FaUser />
                  <span className="hidden sm:block text-sm">Đăng nhập</span>
                </Link>
              )}
              {userMenuOpen && isAuthenticated && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <Link
                      to="/orders"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      <FaClipboardList className="mr-3" /> Orders
                    </Link>
                    <a
                      href="#"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      <FaInfoCircle className="mr-3" /> User Info
                    </a>
                    <a
                      href="#"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      <FaSignOutAlt className="mr-3" /> Logout
                    </a>
                  </div>
                </div>
              )}
            </div>
            <Link to="/cart">
              <div
                className="text-2xl hover:text-blue-200 cursor-pointer flex flex-col justify-center items-center focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-full p-1"
                aria-label="Shopping Cart"
              >
                <FaShoppingCart />
                <span className="hidden sm:block text-sm">Cart</span>
              </div>
            </Link>
            <button
              className="md:hidden text-2xl hover:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-full p-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <FaBars />
            </button>
          </div>
        </div>
        <div className="mt-4 md:hidden">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full py-2 px-4 rounded-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
              aria-label="Search products"
            />
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-blue-500 focus:outline-none"
              aria-label="Search"
            >
              <FaSearch />
            </button>
          </div>
        </div>
      </div>
      <nav
        className={`bg-gray-800 ${
          mobileMenuOpen ? "block" : "hidden md:block"
        }`}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <ul className="flex flex-col md:flex-row md:justify-center">
            <li className="relative group">
              <Link
                to={"/products/news"}
                className="cursor-pointer flex items-end w-full md:w-auto py-3 px-4 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span>News</span>
              </Link>
            </li>
            {categories.map((category) => (
              <li
                key={category.name}
                className="relative group"
                onMouseEnter={() => setHoveredCategory(category.name)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <div className="cursor-pointer flex items-end w-full md:w-auto py-3 px-4 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span>{category.name}</span>
                  <FaAngleDown />
                </div>
                {hoveredCategory === category.name && (
                  <ul className="absolute left-0 w-full min-w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 transition-all duration-300 ease-in-out transform opacity-100 scale-100">
                    {category.subcategories.map((subcat) => (
                      <li key={subcat.id}>
                        <Link
                          to={"/products/" + subcat.thump}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {subcat.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
