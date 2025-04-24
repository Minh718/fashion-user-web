import React from "react";
import { FaSpinner } from "react-icons/fa";
// import CircularProgress from "@mui/material/CircularProgress";
export default function Loading() {
  return (
    <div className="flex w-full h-full items-center justify-center">
      <FaSpinner className="animate-spin h-[10%] w-[10%] mr-3" />
    </div>
  );
}
