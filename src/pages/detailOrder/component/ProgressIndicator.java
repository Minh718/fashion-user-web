import React from 'react'
import { FaBox, FaCheckCircle, FaTruck } from 'react-icons/fa';
import { shippingStatus } from '../../../enum/shippingStatus';

export default function ProgressIndicator({status}) {
    
  const stages = [
    { icon: <FaBox />, label: "Pending" },
    { icon: <FaBox />, label: "Confirmed" },
    { icon: <FaTruck />, label: "Shipped" },
    { icon: <FaCheckCircle />, label: "Delivered" },
  ];
  const convertState = () => {
    switch (status) {
      case shippingStatus.PENDING:
        return 0;
      case shippingStatus.CONFIRMED:
        return 1;
      case shippingStatus.SHIPPED:
        return 2;
      case shippingStatus.DELIVERED:
        return 3;
      default:
        return -1;
    }
  };
  return (
    <div className="mb-8">
    <div className="flex justify-between items-center">
      {stages.map((stage, index) => (
        <div key={index} className="flex flex-col items-center w-1/4">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${index <= convertState() ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-500"}`}
          >
            {stage.icon}
          </div>
          <span className="mt-2 text-sm text-center">{stage.label}</span>
        </div>
      ))}
    </div>
    <div className="mt-4 h-2 bg-gray-200 rounded-full">
      <div
        className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-in-out"
        style={{ width: `${(convertState() / (stages.length - 1)) * 100}%` }}
      ></div>
    </div>
  </div>
  )
}
