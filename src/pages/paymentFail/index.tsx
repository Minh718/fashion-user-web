import React from "react";
import { FaTimes, FaEnvelope, FaPhone } from "react-icons/fa";

const PaymentFailPage = () => {
  const errorMessage = "Insufficient Funds";

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
            <FaTimes className="h-8 w-8 text-red-600" aria-hidden="true" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Payment Failed
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We're sorry, but your payment could not be processed at this time.
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <FaTimes className="h-5 w-5 text-red-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Error Details
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{errorMessage}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <button
              type="button"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Retry Payment
            </button>
          </div>

          <div className="text-sm text-center">
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out"
            >
              Return to previous page
            </a>
          </div>

          <div className="mt-6 border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900">Need Help?</h3>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <FaEnvelope
                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <a
                href="mailto:support@example.com"
                className="hover:text-indigo-500 transition duration-150 ease-in-out"
              >
                support@example.com
              </a>
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <FaPhone
                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <a
                href="tel:+1234567890"
                className="hover:text-indigo-500 transition duration-150 ease-in-out"
              >
                +1 (234) 567-890
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailPage;
