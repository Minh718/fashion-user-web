import React, { useEffect, useState } from "react";
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
import { statusOrder } from "../../enum/StatusOrder";
import { Metadata } from "../../types/Metadata";
import { fetchOrders, userCancelOrder } from "../../services/orderService";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import LoadingBigger from "../../components/LoadingBigger";
import { shippingStatus } from "../../enum/shippingStatus";
import { notifyError, notifySuccess } from "../../components/toastNotify";
import { PaymentStatus } from "../../enum/paymentStatus";
import { BsBank } from "react-icons/bs";
const dummyOrders = [
  {
    id: 1,
    totalAmount: 129.99,
    totalQuantity: 3,
    shippingAddress: "123 Main St, Anytown, USA",
    phone: "+1234567890",
    fullName: "John Doe",
    urlPayment: "https://example.com/payment/1",
    orderStatus: "DELIVERED",
    payment: {
      paymentMethod: "VNPAY",
      paymentStatus: "PAIED",
    },
    shippingStatus: "SHIPPED",
    trackingNumber: "TRK123456789",
    shippingFee: 10,
    paymentFee: 2,
    discount: 5,
    createdAt: "2023-05-15",
  },
  {
    id: 2,
    totalAmount: 79.99,
    totalQuantity: 1,
    shippingAddress: "456 Elm St, Othertown, USA",
    phone: "+1987654321",
    fullName: "Jane Smith",
    urlPayment: "https://example.com/payment/2",
    orderStatus: "SHIPPED",
    payment: {
      paymentMethod: "VNPAY",
      paymentStatus: "PAIED",
    },
    shippingStatus: "SHIPPED",
    trackingNumber: "TRK987654321",
    shippingFee: 8,
    paymentFee: 1.5,
    discount: 0,
    createdAt: "2023-05-20",
  },
  {
    id: 3,
    totalAmount: 199.97,
    totalQuantity: 3,
    shippingAddress: "789 Oak St, Somewhere, USA",
    phone: "+1122334455",
    fullName: "Bob Johnson",
    urlPayment: "https://example.com/payment/3",
    orderStatus: "PENDING",
    payment: {
      paymentMethod: "VNPAY",
      paymentStatus: "PAIED",
    },
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
const OrderHistory = () => {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [page, setPage] = React.useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [size, setSize] = React.useState(7);
  const [orders, setOrders] = useState<any[]>([]);
  const [metadata, setMetadata] = React.useState<Metadata | null>(null);

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-200 text-yellow-800";
      case "CONFIRMED":
        return "bg-orange-200 text-orange-800";
      case "SHIPPED":
        return "bg-blue-200 text-blue-800";
      case "DELIVERED":
        return "bg-green-200 text-green-800";
      case "CANCELED":
        return "bg-red-200 text-red-800";
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const res = await userCancelOrder(orderId);
      notifySuccess(res.message);
      const newOrder = res.result;
      setOrders(
        orders.map((order) => (order.id === newOrder.id ? newOrder : order))
      );
    } catch (err) {
      notifyError(err.response.data.message);
    }
  };
  const handleConfirmUserReceiveOrder = async (orderId) => {};
  const handleChangePage = async ({ selected }) => {
    setPage(selected);
  };
  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const res = await fetchOrders({ page, size }, filterStatus);
      setOrders(res.result);
      setMetadata(res.metadata);
      setIsLoading(false);
    })();
  }, [page, filterStatus]);
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
          onChange={(e) => {
            setPage(0);
            setFilterStatus(e.target.value);
          }}
        >
          <option value="all">All</option>
          {Object.entries(statusOrder).map(([key, value]) => (
            <option key={key} value={value}>
              {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-4 min-h-[65vh]">
        {isLoading ? (
          <LoadingBigger />
        ) : orders.length === 0 ? (
          <div className="text-center">Order history is Empty!</div>
        ) : (
          <>
            {orders.map((order) => (
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
                      ${order.totalAmount.toFixed(2)}
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
                      <h4 className="font-semibold mb-1">
                        Shipping Information
                      </h4>
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
                      <h4 className="font-semibold mb-1">
                        Payment Information
                      </h4>
                      <p className="text-sm">
                        Method: {order.payment?.paymentMethod}
                      </p>
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
                      <Link to={`/order/${order.id}`}>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center">
                          <FaEye className="mr-2" /> View Details
                        </button>
                      </Link>
                      {order.payment?.paymentStatus === PaymentStatus.unpaid &&
                        order.orderStatus === statusOrder.pending && (
                          <button
                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded flex items-center"
                            onClick={() => {
                              window.location.href = order.urlPayment;
                            }}
                          >
                            <BsBank className="mr-2" /> Payment
                          </button>
                        )}
                      {order.shippingStatus === shippingStatus.DELIVERED &&
                        order.orderStatus === statusOrder.shipped && (
                          <button
                            onClick={() =>
                              handleConfirmUserReceiveOrder(order.id)
                            }
                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded flex items-center"
                          >
                            <FaTimes className="mr-2" /> Confirm receive order
                          </button>
                        )}
                      {order.shippingStatus === shippingStatus.NOT_SHIPPED && (
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

            {/* ✅ Pagination is outside of the loop */}
            <div className="flex justify-end items-center px-4 py-2">
              <Pagination
                page={page}
                pageCount={metadata?.totalPages ?? 6}
                handlePageClick={handleChangePage}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
