import React, { useEffect } from "react";
import {
  getDistricts,
  getProvinces,
  getWards,
} from "../../../services/addressService";
import { FaReply } from "react-icons/fa";
import { notifyError } from "../../../components/toastNotify";
import { Province } from "../../../types/Province";
import { Ward } from "../../../types/Ward";
import { District } from "../../../types/District";
import { paymentMethodsRender } from "../../../enum/paymentMethod";
export default function InfoOrder({
  checkout,
  setIsContinuted,
  handleProccessingOrder,
}) {
  const [province, setProvince] = React.useState("");

  const [district, setDistrict] = React.useState("");
  const [ward, setWard] = React.useState("");

  const [provinces, setProvinces] = React.useState<Province[]>([]);
  const [districts, setDistricts] = React.useState<District[]>([]);
  const [wards, setWards] = React.useState<Ward[]>([]);

  const [phone, setPhone] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [detailAddress, setDetailAddress] = React.useState("");
  const [paymentMethod, setPaymentMethod] = React.useState("CASH_ON_DELIVERY");
  const handleInfoOrder = () => {
    if (fullName === "") {
      notifyError("FullName is required");
    } else if (phone === "") {
      notifyError("Phone is required");
    } else if (province === null) {
      notifyError("Province is required");
    } else if (district === null) {
      notifyError("District is required");
    } else if (ward === null) {
      notifyError("Ward is required");
    } else if (detailAddress === "") {
      notifyError("Detail address is required");
    } else {
      const shippingAddress =
        detailAddress + ", " + ward + ", " + district + ", " + province;
      handleProccessingOrder({
        phone,
        fullName,
        shippingAddress,
        paymentMethod,
      });
    }
  };
  useEffect(() => {
    (async () => {
      const res = await getProvinces();
      setProvinces(res);
    })();
  }, []);
  const handleChangeProvince = async (event) => {
    const idProvince = event.target.value;
    setProvince(idProvince);
    setDistrict("");
    setDistricts([]);
    setWard("");
    setWards([]);
    const res = await getDistricts(idProvince);
    setDistricts(res);
  };
  const handleChangeDistrict = async (event) => {
    const idDistrict = event.target.value;
    setDistrict(idDistrict);
    setWard("");
    setWards([]);
    const res = await getWards(idDistrict);
    setWards(res);
  };
  // useEffect(() => {
  //     setWards([])
  // }, [province])
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900">
          Delivery Information
        </h1>
        <div className="mb-4">
          <label htmlFor="fullNameorder" className="block mt-1">
            Fullname
          </label>
          <input
            id="fullNameorder"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Input fullname"
            className="border w-full px-3 py-2 mt-1"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phoneorder" className="block mt-1">
            Phone
          </label>
          <input
            id="phoneorder"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Input phone"
            className="border w-full px-3 py-2 mt-1"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <select
            className="border p-2"
            value={province}
            onChange={handleChangeProvince}
          >
            <option>Choose province</option>
            {provinces.map((p) => (
              <option key={p.id} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
          <select
            className="border p-2"
            value={district}
            onChange={handleChangeDistrict}
          >
            <option>Choose district</option>
            {districts.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
          <select
            className="border p-2"
            value={ward}
            onChange={(e) => setWard(e.target.value)}
          >
            <option>Choose ward</option>
            {wards.map((w) => (
              <option key={w.id} value={w.name}>
                {w.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="detailAddress" className="block mt-1">
            House number, village
          </label>
          <input
            id="detailAddress"
            type="text"
            value={detailAddress}
            onChange={(e) => setDetailAddress(e.target.value)}
            placeholder="Detail address"
            className="border w-full px-3 py-2 mt-1"
          />
        </div>

        <div className="mb-4">
          <label className="block mt-1">Payment Method</label>
          {paymentMethodsRender.map((method) => (
            <div key={method.value} className="flex items-center mb-2">
              <input
                type="radio"
                name="paymentMethod"
                value={method.value}
                checked={paymentMethod === method.value}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2"
              />
              <label>{method.name}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="pl-3">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Order Information
        </h1>
        <div className="mb-10">
          <div className="flex justify-between items-center mt-2">
            <h1>Subtotal:</h1>
            <span className="font-bold">
              {checkout.totalPrice.toLocaleString("de-DE")}đ
            </span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <h1>Product Discount:</h1>
            <span className="font-bold">
              {checkout.discount.toLocaleString("de-DE")}đ
            </span>
          </div>
          <div className="flex justify-between items-center my-2">
            <h1>Shipping fee:</h1>
            <span className="font-bold">0đ</span>
          </div>
          <div className="flex justify-between items-center">
            <h1>Total Amount:</h1>
            <span className="font-bold">
              {checkout.paymentFee.toLocaleString("de-DE")}đ
            </span>
          </div>
          <div className="flex items-center flex-col mt-5">
            <button
              onClick={handleInfoOrder}
              className="w-full mb-5 border px-6 py-2 bg-indigo-600 text-white font-bold"
            >
              Pay Now
            </button>
            <button
              onClick={() => setIsContinuted(false)}
              className="flex items-center"
            >
              {" "}
              <FaReply className="mr-2" /> Back to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
