import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaEdit, FaShoppingCart, FaTruck } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
// const order = {
//   id: 1165,
//   totalAmount: 625.36,
//   discount: 20,
//   shippingAddress: "So nha 80, thon thang lap 1;, Sơn Lộ, Bảo Lạc, Cao Bằng",
//   phone: "123",
//   fullName: "minh",
//   urlPayment: null,
//   orderStatus: "CONFIRMED",
//   shippingStatus: "NOT_SHIPPED",
//   trackingNumber: null,
//   createdAt: "2025-04-01T03:45:44.472713",
//   payment: {
//     paymentMethod: "CASH_ON_DELIVERY",
//     paymentStatus: "UNPAID",
//   },
//   voucher: {
//     id: 3,
//     code: "DK882",
//     type: "FIXED",
//     discount: 20,
//   },
//   orderProducts: [
//     {
//       id: 1732,
//       quantity: 7,
//       price: 75,
//       image: "https://picsum.photos/200/301",
//       name: "Soft-Touch Lightweight Flannel Shirt",
//       size: "XXL",
//       color: "Red",
//     },
//     {
//       id: 1733,
//       quantity: 4,
//       price: 28,
//       image: "https://picsum.photos/200/303",
//       name: "Brushed Flannel Shirt",
//       size: "XXL",
//       color: "Light Orange",
//     },
//   ],
// };

function formatDateWithOffset(dateStr, daysToAdd) {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + daysToAdd);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
}
const SuccessOrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;
  useEffect(() => {
    if (!order) {
      navigate("/404");
    }
  }, [order, navigate]); // Run effect when order or navigate changes

  if (!order) return null; // Prevent rendering before redirect
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-green-500 text-white px-6 py-4">
          <div className="flex items-center justify-center">
            <FaCheckCircle className="text-4xl mr-2" />
            <h1 className="text-2xl font-bold">Order Placed Successfully!</h1>
          </div>
        </div>

        <div className="px-6 py-4">
          <p className="text-gray-700 text-lg mb-4">
            Thank you for your order. Your order number is{" "}
            <span className="font-semibold">{order.id}</span>. Estimated
            delivery date:{" "}
            <span className="font-semibold">
              {formatDateWithOffset(order.createdAt, 7)}
            </span>
          </p>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
            <div className="border-t border-b py-2">
              {order.orderProducts.map((item, index) => (
                <div key={index} className="flex justify-between py-1">
                  <span>
                    {item.name} ({item.size}) ({item.color})
                  </span>
                  <span>
                    (x{item.quantity}) $
                    {(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="flex justify-between py-1">
                <span>Shipping</span>
                <span>0</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Discount</span>
                <span>${order.discount}</span>
              </div>
            </div>
            <div className="flex justify-between font-semibold text-lg mt-2">
              <span>Total</span>
              <span>${order.totalAmount}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Payment Method: {order.payment.paymentMethod}
            </p>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">Customer Information</h2>
            </div>
            <div>
              <p>{order.fullName}</p>
              <p>{order.shippingAddress}</p>
              <p>{order.phone}</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Order Tracking</h2>
            <div className="bg-gray-100 p-4 rounded">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Current Status:</span>
                <span className="text-green-600 font-semibold">Processing</span>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-2.5">
                <div className="bg-green-600 h-2.5 rounded-full w-1/4"></div>
              </div>
              <button className="mt-4 flex items-center text-blue-500 hover:text-blue-700">
                <FaTruck className="mr-2" /> Track Order in Real-time
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <Link to="/products/news">
              <button className="bg-green-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition duration-200 flex items-center">
                <FaShoppingCart className="mr-2" /> Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessOrderPage;
