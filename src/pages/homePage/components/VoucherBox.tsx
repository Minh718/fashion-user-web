import React from "react";
import { Voucher } from "../../../types/voucher";

export default function VoucherBox({ voucher, copiedCode, setCopiedCode }) {
  const handleCopyCode = (code, e) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
  };
  return (
    <div
      key={voucher.id}
      className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4 py-8 md:px-8"
    >
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
        <div className="relative">
          <img
            src={"https://picsum.photos/200/300"}
            alt={voucher.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-0 right-0 bg-yellow-400 text-gray-800 font-bold py-1 px-3 rounded-bl-lg">
            Voucher
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">{voucher.title}</h3>
          <p className="text-gray-600 mb-4">{voucher.description}</p>
          <p className="text-sm text-gray-500 mb-4">{voucher.validity}</p>
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-blue-600">
              {voucher.code}
            </span>
            <button
              onClick={(e) => handleCopyCode(voucher.code, e)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
            >
              {copiedCode === voucher.code ? "Code Copied" : "Copy Code"}
            </button>
          </div>
          <button className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300">
            Redeem Now
          </button>
        </div>
      </div>
    </div>
  );
}
