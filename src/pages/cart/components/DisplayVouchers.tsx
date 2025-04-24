import React, { useEffect, useState } from "react";
import { FaCheck, FaTags } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { Voucher } from "../../../types/voucher";
import { getAllUserVouchers } from "../../../services/voucherService";
import { notifyError } from "../../../components/toastNotify";
export default function DisplayVouchers({ setCurrentCode }) {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [voucherData, setVoucherData] = useState<Voucher | null>(null);
  const handleCloseBackdrop = () => {
    setShowBackdrop(false);
    setTimeout(() => setVoucherData(null), 300); // Clear data after transition
  };
  const handleApplyVoucher = () => {
    handleCloseBackdrop();
    setCurrentCode(voucherData?.code);
  };
  const handleVoucherClick = (voucher) => {
    setVoucherData(voucher);
    setShowBackdrop(true);
  };
  useEffect(() => {
    (async () => {
      try {
        const res = await getAllUserVouchers();
        setVouchers(res);
      } catch (error) {
        notifyError("Error occur");
      }
    })();
  }, []);
  return (
    <>
      <h1 className="text-[#338dbc] text-[14px] mb-1">
        <FaTags /> Mã giảm giá hiện có:
      </h1>
      <div className=" flex flex-wrap">
        {vouchers?.map((voucher) => (
          <span
            onClick={() => handleVoucherClick(voucher)}
            key={voucher.id}
            className="border-[2px] cursor-pointer border-[#338dbc] px-[10px] py-[2px] rounded mr-2 mb-1 font-medium text-[#338dbc]"
          >
            {voucher.discount}
            {voucher.type === "PERCENT" ? "%" : "$"}
          </span>
        ))}
      </div>
      {showBackdrop && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out">
          <div
            className={`bg-white rounded-2xl p-8 max-w-sm w-full relative overflow-hidden shadow-2xl transition-all duration-300 ease-in-out ${
              showBackdrop ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <button
              onClick={handleCloseBackdrop}
              className="absolute z-10 top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none transition duration-300 transform hover:rotate-90"
            >
              <FaTimes />
            </button>
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-yellow-400 to-orange-500 z-0"></div>
            <img
              src="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Summer Voucher"
              className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-lg mx-auto mb-4 relative z-10"
            />
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
              Summer Voucher
            </h2>
            {voucherData && (
              <div className="space-y-3 mb-4">
                <p className="text-sm">
                  <span className="font-semibold text-gray-700">Code:</span>{" "}
                  <span className="text-yellow-600 font-bold">
                    {voucherData.code}
                  </span>
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-gray-700">Discount:</span>{" "}
                  <span className="text-green-600 font-bold">
                    {voucherData.type !== "PERCENT" && "$"}
                    {voucherData.discount}
                    {voucherData.type === "PERCENT" && "%"}
                  </span>
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-gray-700">
                    Min Purchase:
                  </span>{" "}
                  <span className="text-blue-600 font-bold">
                    ${voucherData.minPrice}
                  </span>
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-gray-700">
                    Max Discount:
                  </span>{" "}
                  <span className="text-red-600 font-bold">
                    ${voucherData.maxDiscount}
                  </span>
                </p>
                <p className="text-sm">
                  <span className="font-semibold text-gray-700">
                    Valid Until:
                  </span>{" "}
                  <span className="text-purple-600 font-bold">
                    {voucherData.endDate}
                  </span>
                </p>
                <p className="text-xs text-gray-600 italic">
                  {voucherData.description}
                </p>
              </div>
            )}
            <button
              onClick={handleApplyVoucher}
              className="w-full py-2 text-white bg-gradient-to-r from-green-400 to-blue-500 rounded-full hover:from-green-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transition duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center text-sm"
            >
              <FaCheck className="mr-2" /> Apply Voucher
            </button>
          </div>
        </div>
      )}
    </>
  );
}
