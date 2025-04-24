import { FaSpinner } from "react-icons/fa";
import React from "react";

export default function LoadingBigger() {
  return (
    <div className="flex w-full h-[80vh] items-center justify-center">
      <FaSpinner className="animate-spin h-[40px] w-[40px] mr-3" />
    </div>
  );
}
