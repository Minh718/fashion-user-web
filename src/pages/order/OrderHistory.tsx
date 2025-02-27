import React, { useState } from "react";
import {
  FaSearch,
  FaChevronDown,
  FaChevronUp,
  FaTruck,
  FaEye,
  FaTimes,
} from "react-icons/fa";
import Pagination from "../../components/Pagination";
import Breadcrumbs from "../../components/Breadcrumbs";

const OrderHistory = () => {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");

  const dummyOrders = [
    {
      id: 1,
      totalPrice: 129.99,
      totalQuantity: 3,
      shippingAddress: "123 Main St, Anytown, USA",
      phone: "+1234567890",
      fullName: "John Doe",
      urlPayment: "https://example.com/payment/1",
      orderStatus: "DELIVERED",
      paymentMethod: "VNPAY",
      shippingStatus: "SHIPPED",
      trackingNumber: "TRK123456789",
      shippingFee: 10,
      paymentFee: 2,
      discount: 5,
      createdAt: "2023-05-15",
    },
    {
      id: 2,
      totalPrice: 79.99,
      totalQuantity: 1,
      shippingAddress: "456 Elm St, Othertown, USA",
      phone: "+1987654321",
      fullName: "Jane Smith",
      urlPayment: "https://example.com/payment/2",
      orderStatus: "SHIPPED",
      paymentMethod: "VNPAY",
      shippingStatus: "SHIPPED",
      trackingNumber: "TRK987654321",
      shippingFee: 8,
      paymentFee: 1.5,
      discount: 0,
      createdAt: "2023-05-20",
    },
    {
      id: 3,
      totalPrice: 199.97,
      totalQuantity: 3,
      shippingAddress: "789 Oak St, Somewhere, USA",
      phone: "+1122334455",
      fullName: "Bob Johnson",
      urlPayment: "https://example.com/payment/3",
      orderStatus: "PENDING",
      paymentMethod: "VNPAY",
      shippingStatus: "NOT_SHIPPED",
      trackingNumber: "TRK456789123",
      shippingFee: 12,
      paymentFee: 3,
      discount: 10,
      createdAt: "2023-05-25",
    },
  ];
  const links = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Orders",
      url: "/orders",
    },
  ];
  const filteredOrders =
    filterStatus === "all"
      ? dummyOrders
      : dummyOrders.filter((order) => order.orderStatus === filterStatus);

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-200 text-yellow-800";
      case "SHIPPED":
        return "bg-blue-200 text-blue-800";
      case "DELIVERED":
        return "bg-green-200 text-green-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const handleViewDetails = (orderId) => {
    console.log(`View details for order ${orderId}`);
    // Implement view details functionality here
  };

  const handleCancelOrder = (orderId) => {
    console.log(`Cancel order ${orderId}`);
    // Implement cancel order functionality here
  };

  return (
    <div className="bg-white container mx-auto min-h-[85vh] px-4 py-8">
      <Breadcrumbs links={links} />
      <h1 className="text-3xl font-extrabold text-gray-900 mb-3">
        Order History
      </h1>
      <div className="mb-4">
        <label htmlFor="statusFilter" className="mr-2 font-semibold">
          Filter by Status:
        </label>
        <select
          id="statusFilter"
          className="border rounded p-2"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="PENDING">Pending</option>
          <option value="SHIPPED">Shipped</option>
          <option value="DELIVERED">Delivered</option>
        </select>
      </div>
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="border rounded-lg shadow-md overflow-hidden"
          >
            <div
              className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
              onClick={() => toggleOrderExpansion(order.id)}
              role="button"
              tabIndex={0}
              aria-expanded={expandedOrder === order.id}
              onKeyPress={(e) =>
                e.key === "Enter" && toggleOrderExpansion(order.id)
              }
            >
              <div>
                <h2 className="text-lg font-semibold">Order #{order.id}</h2>
                <p className="text-sm text-gray-600">{order.createdAt}</p>
              </div>
              <div className="flex items-center">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold mr-2 ${getStatusColor(
                    order.orderStatus
                  )}`}
                >
                  {order.orderStatus}
                </span>
                <span className="text-lg font-bold">
                  ${order.totalPrice.toFixed(2)}
                </span>
                {expandedOrder === order.id ? (
                  <FaChevronUp className="ml-2" />
                ) : (
                  <FaChevronDown className="ml-2" />
                )}
              </div>
            </div>
            {expandedOrder === order.id && (
              <div className="p-4 bg-white">
                <div className="border-t pt-2">
                  <h4 className="font-semibold mb-1">Shipping Information</h4>
                  <p className="text-sm">{order.fullName}</p>
                  <p className="text-sm">{order.shippingAddress}</p>
                  <p className="text-sm">{order.phone}</p>
                  <div className="flex items-center mt-2">
                    <FaTruck className="mr-2" />
                    <span className="text-sm">
                      Tracking: {order.trackingNumber}
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold mb-1">Payment Information</h4>
                  <p className="text-sm">Method: {order.paymentMethod}</p>
                  <a
                    href={order.urlPayment}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Payment Details
                  </a>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={() => handleViewDetails(order.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
                  >
                    <FaEye className="mr-2" /> View Details
                  </button>
                  {order.orderStatus === "PENDING" && (
                    <button
                      onClick={() => handleCancelOrder(order.id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded flex items-center"
                    >
                      <FaTimes className="mr-2" /> Cancel Order
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-end items-center px-4 py-4">
        <Pagination pageCount={10} handlePageClick={null} />
      </div>
    </div>
  );
};

export default OrderHistory;
