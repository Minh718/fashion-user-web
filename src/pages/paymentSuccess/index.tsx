import React, { useState, useEffect } from "react";
import {
  FaCheckCircle,
  FaCreditCard,
  FaShoppingCart,
  FaChevronUp,
} from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getPaymentDetail } from "../../services/orderService";
import Loading from "../../components/Loading";

const PaymentSuccessPage = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [paymentDetail, setPaymentDetail] = useState<any>(null);
  const navigate = useNavigate();

  let { id } = useParams();
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const fetchPaymentData = async (id) => {
    try {
      const res = await getPaymentDetail(id);
      setPaymentDetail(res);
    } catch (err) {
      navigate("/404");
    }
  };
  useEffect(() => {
    fetchPaymentData(id);
  }, [id, fetchPaymentData]);
  if (paymentDetail === null) return <Loading />;
  return (
    <div className="min-h-screen  bg-gray-100 p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-green-500 p-6 sm:p-8 text-white text-center">
          <FaCheckCircle className="text-6xl sm:text-7xl md:text-8xl mx-auto mb-4 animate-bounce" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
            Payment Successful!
          </h1>
          <p className="text-lg sm:text-xl opacity-90">
            Your transaction has been processed successfully.
          </p>
        </div>

        <div className="p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Transaction Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-600">Amount Paid</p>
                <p className="text-2xl font-bold">${paymentDetail.amount}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-600">Payment Method</p>
                <p className="text-2xl font-bold flex items-center">
                  <FaCreditCard className="mr-2" />{" "}
                  {paymentDetail.paymentMethod}
                </p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg sm:col-span-2">
                <p className="text-gray-600">Transaction ID</p>
                <p className="text-xl font-mono">
                  {paymentDetail.transactionID}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={`/order/${paymentDetail.orderId}`}>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                View Order
              </button>
            </Link>
            <Link to={`/products/news`}>
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 flex items-center justify-center">
                <FaShoppingCart className="mr-2" /> Continue Shopping
              </button>
            </Link>
          </div>
        </div>

        <div className="bg-gray-100 p-6 sm:p-8">
          <h3 className="text-xl font-semibold mb-4">What's Next?</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>You will receive an email confirmation shortly.</li>
            <li>
              Your order will be processed and shipped within 1-3 business days.
            </li>
            <li>Track your order status in your account dashboard.</li>
          </ul>
        </div>
      </div>

      {showBackToTop && (
        <button
          className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <FaChevronUp />
        </button>
      )}
    </div>
  );
};

export default PaymentSuccessPage;
