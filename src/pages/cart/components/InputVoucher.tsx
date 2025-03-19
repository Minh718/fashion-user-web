import React from "react";

export default function InputVoucher({ handleCheckout, setCurrentCode }) {
  const [code, setCode] = React.useState("");

  return (
    <div className="flex py-2">
      <input
        placeholder="Nhập code"
        onChange={(e) => setCode(e.target.value)}
        className="w-1/2 py-2 px-4 border-2"
      />
      <button
        onClick={() => {
          if (code !== "") setCurrentCode(code);
        }}
        className=" w-1/2   bg-black text-white font-bold ml-2 hover:opacity-80 transition"
      >
        Apply voucher
      </button>
    </div>
  );
}
