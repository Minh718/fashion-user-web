import React, { useState } from "react";
import {
  FaShippingFast,
  FaCalendarAlt,
  FaCreditCard,
  FaInfoCircle,
  FaTicketAlt,
} from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { SiVisa, SiMastercard } from "react-icons/si";
import { GiCash } from "react-icons/gi";
import { BsBank } from "react-icons/bs";
import Breadcrumbs from "../../components/Breadcrumbs";
const links = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Orders",
    url: "/orders",
  },
  {
    name: "Order details",
    url: "/orders",
  },
];
const DetailOrderPage = () => {
  const [order, setOrder] = useState({
    totalPrice: 299.99,
    orderCode: "ORD12345",
    customerName: "John Doe",
    address: "123 Main St, Anytown, USA 12345",
    phoneNumber: "+1 (555) 123-4567",
    orderStatus: "Shipped",
    shippingStatus: "In Transit",
    trackingNumber: "TRK9876543210",
    paymentMethod: "bank",
    creationDate: "2023-05-15",
    voucher: {
      code: "SUMMER20",
      discount: 20,
      type: "percentage",
    },
    products: [
      {
        id: 1,
        name: "Premium T-Shirt",
        size: "L",
        color: "Navy Blue",
        quantity: 2,
        price: 49.99,
      },
      {
        id: 2,
        name: "Designer Jeans",
        size: "32",
        color: "Indigo",
        quantity: 1,
        price: 89.99,
      },
      {
        id: 3,
        name: "Running Shoes",
        size: "10",
        color: "Black/White",
        quantity: 1,
        price: 110.0,
      },
    ],
  });

  const [showTooltip, setShowTooltip] = useState(false);

  const handleTrackingClick = () => {
    // Implement tracking logic here
    alert(`Tracking order: ${order.trackingNumber}`);
  };
  const calculateDiscountedTotal = () => {
    const totalPrice = order.totalPrice;
    if (order.voucher) {
      if (order.voucher.type === "percentage") {
        return totalPrice * (1 - order.voucher.discount / 100);
      } else {
        return totalPrice - order.voucher.discount;
      }
    }
    return totalPrice;
  };
  const renderPaymentMethodIcon = (method) => {
    switch (method) {
      case "Credit Card":
        return <FaCreditCard className="text-2xl text-purple-600" />;
      case "Cash on Delivery":
        return <GiCash className="text-2xl text-green-600" />;
      case "VNPAY":
        return <SiVisa className="text-2xl text-blue-600" />;
      case "Bank":
        return <BsBank className="text-2xl text-red-600" />;
      default:
        return <FaCreditCard className="text-2xl text-purple-600" />;
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 sm:p-8">
          <Breadcrumbs links={links} />
          <h1 className="text-3xl font-extrabold text-gray-900 mb-3">
            Order Details
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                Order Information
              </h2>
              <p className="mb-2">
                <span className="font-medium">Customer:</span>{" "}
                {order.customerName}
              </p>
              <p className="mb-2">
                <span className="font-medium">Address:</span> {order.address}
              </p>
              <p className="mb-2">
                <span className="font-medium">Phone:</span> {order.phoneNumber}
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                Shipping Details
              </h2>
              <p className="mb-2">
                <span className="font-medium">Order Status:</span>{" "}
                {order.orderStatus}
              </p>
              <p className="mb-2">
                <span className="font-medium">Shipping Status:</span>{" "}
                {order.shippingStatus}
              </p>
              <p className="mb-2">
                <span className="font-medium">Tracking Number:</span>
                <button
                  onClick={handleTrackingClick}
                  className="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                  aria-label="Track order"
                >
                  {order.trackingNumber}
                </button>
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Track order
            </h2>

            <ProgressIndicator status={shippingStatus.CONFIRMED} />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Ordered Products
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 font-semibold text-sm text-gray-600 border-b">
                      Product
                    </th>
                    <th className="py-2 px-4 font-semibold text-sm text-gray-600 border-b">
                      Size
                    </th>
                    <th className="py-2 px-4 font-semibold text-sm text-gray-600 border-b">
                      Color
                    </th>
                    <th className="py-2 px-4 font-semibold text-sm text-gray-600 border-b">
                      Quantity
                    </th>
                    <th className="py-2 px-4 font-semibold text-sm text-gray-600 border-b">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="py-2 px-4 border-b">{product.name}</td>
                      <td className="py-2 px-4 border-b">{product.size}</td>
                      <td className="py-2 px-4 border-b">{product.color}</td>
                      <td className="py-2 px-4 border-b">{product.quantity}</td>
                      <td className="py-2 px-4 border-b">
                        ${product.price.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total Price:</span>
                  <span className="text-lg font-bold">${order.totalPrice}</span>
                </div>
                {order.voucher && (
                  <div className="bg-green-50 border border-green-200 rounded-md p-4">
                    <div className="flex items-center">
                      <FaTicketAlt className="text-green-500 mr-2" />
                      <h3 className="text-lg font-semibold text-green-700">
                        Voucher Applied
                      </h3>
                    </div>
                    <div className="lg:flex justify-between items-center">
                      <p className="mt-2 text-green-600">
                        Voucher code{" "}
                        <span className="font-semibold">
                          {order.voucher.code}
                        </span>{" "}
                        applied for a
                        {order.voucher.type === "percentage"
                          ? ` ${order.voucher.discount}% discount`
                          : ` $${order.voucher.discount} discount`}
                      </p>
                      <p className="mt-1 text-green-600">
                        <span className="font-semibold">Total payment:</span>{" "}
                        <span className="text-2xl font-bold">
                          ${calculateDiscountedTotal().toFixed(2)}
                        </span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 sm:px-8 sm:py-6 flex flex-wrap items-center justify-between">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <FaShippingFast className="text-2xl text-blue-600" />
            <span className="text-sm font-medium text-gray-600">
              Fast Shipping
            </span>
          </div>
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <FaCalendarAlt className="text-2xl text-green-600" />
            <span className="text-sm font-medium text-gray-600">
              Order Placed: {order.creationDate}
            </span>
          </div>
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            {renderPaymentMethodIcon(order.paymentMethod)}
            <span className="text-sm font-medium text-gray-600">
              {order.paymentMethod}
            </span>
          </div>
          <div className="relative">
            <button
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
              aria-label="Show shipping information"
            >
              <MdLocalShipping className="text-2xl" />
              <span className="text-sm font-medium">Shipping Info</span>
            </button>
            {showTooltip && (
              <div className="absolute bottom-full left-0 mb-2 w-48 bg-white border border-gray-200 rounded shadow-lg p-2 text-sm text-gray-700">
                Estimated delivery: 3-5 business days
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailOrderPage;
