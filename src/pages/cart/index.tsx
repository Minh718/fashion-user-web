import React, { useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import ProductCart from "./components/ProductCart";
import ReactPaginate from "react-paginate";
import Pagination from "../../components/Pagination";
import Breadcrumbs from "../../components/Breadcrumbs";
import InputVoucher from "./components/InputVoucher";
import DisplayVouchers from "./components/DisplayVouchers";
import InfoOrder from "./components/InfoOrder";
import LoadingBigger from "../../components/LoadingBigger";
import PopupReloadPage from "../../components/PopupReloadPage";
import { notifyError, notifySuccess } from "../../components/toastNotify";
import { checkoutProducts } from "../../services/checkoutService";
import {
  getAllProductOfCart,
  removeProductFromCart,
} from "../../services/cartService";
import { paymentMethod } from "../../enum/paymentMethod";
import { saveOrder } from "../../services/orderService";
import { Metadata } from "../../types/Metadata";
import { useDispatch, useSelector } from "react-redux";
import { setStatusCart } from "../../store/user/userSlice";
const links = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Cart",
    url: "/cart",
  },
];
export default function Cart() {
  const [isContinuted, setIsContinuted] = React.useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const data = (useLoaderData() as {
    result: any;
    metadata: Metadata;
  }) || { result: null, metadata: null };
  const [metadata, setMetadata] = React.useState<Metadata | null>(null);

  const [currentCode, setCurrentCode] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [cartProductSizeColors, setCartProductSizeColors] = React.useState(
    data.result
  );
  const [choosedCpss, setChoosedCpss] = React.useState<any[]>([]);
  const [checkout, setCheckout] = React.useState({
    totalPrice: 130,
    paymentFee: 0,
    discount: 0,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleAddChoosedCps = (data) => {
    const newChoosedCpss = [...choosedCpss, data];

    setChoosedCpss(newChoosedCpss);
  };
  const handlePageClick = async ({ selected }) => {
    try {
      const res = await getAllProductOfCart(selected);
      setCartProductSizeColors(res.result);
      setMetadata(res.metadata);
      setPage(selected);
    } catch (error) {
      notifyError(error.response.data.message);
    }
  };
  const handleRemoveChoosedCps = (id) => {
    setChoosedCpss(choosedCpss.filter((cps) => cps.id !== id));
  };
  const handleRemoveProduct = async (cpsId) => {
    try {
      await removeProductFromCart(cpsId);
      if (choosedCpss.some((cps) => cps.id === cpsId)) {
        setChoosedCpss(choosedCpss.filter((cps) => cps.id !== cpsId));
      }
      setCartProductSizeColors(
        cartProductSizeColors.filter((cps) => cps.id !== cpsId)
      );
    } catch (err) {
      notifyError(err.response.data.message);
    }
  };
  const handleProccessingOrder = async (data) => {
    try {
      const res = await saveOrder({
        ...data,
        checkoutRes: checkout,
        checkoutReq: { code: currentCode, items: choosedCpss },
      });
      if (data.paymentMethod === paymentMethod.VNPAY) {
        window.location.href = res.urlPayment;
      } else {
        notifySuccess("Order successfully");
        navigate("/order-success", { state: { order: res } });
      }
    } catch (error) {
      if (error.response.data.code === 1051) setErrorPopup(true);
      notifyError(error.response.data.message);
    }
  };

  const handleCheckout = async () => {
    try {
      const res = await checkoutProducts({
        code: currentCode,
        items: choosedCpss,
      });
      setCheckout(res);
    } catch (error) {
      if (error.response.data.code === 1051) setErrorPopup(true);
      setCurrentCode(null);
      notifyError(error.response.data.message);
    }
  };

  React.useEffect(() => {
    if (choosedCpss.length === 0) {
      setCheckout({ totalPrice: 0, paymentFee: 0, discount: 0 });
    } else {
      handleCheckout();
    }
  }, [choosedCpss, currentCode]);

  React.useEffect(() => {
    if (data.metadata) {
      setMetadata(data.metadata);
      setCartProductSizeColors(data.result);
    }
  }, [data.metadata, data.result]); // Only depend on necessary properties to avoid unnecessary renders

  React.useEffect(() => {
    dispatch(setStatusCart(false));
  }, []); // No changes needed here
  if (cartProductSizeColors === null) return <LoadingBigger />;
  return (
    <div className="container mx-auto px-4 min-h-[80vh] py-8 bg-white">
      <Breadcrumbs links={links} />

      <div className="flex justify-center">
        {isContinuted ? (
          <InfoOrder
            checkout={checkout}
            setIsContinuted={setIsContinuted}
            handleProccessingOrder={handleProccessingOrder}
          />
        ) : (
          <div className="flex flex-col lg:flex-row w-full lg:space-x-6 p-1">
            <div className="w-full lg:w-3/5 border-2 mb-6 lg:mb-0">
              <div className="flex justify-between items-start px-4 py-2">
                <h1 className="text-center text-3xl font-extrabold text-gray-900">
                  Cart
                </h1>
                <i>Tổng: {choosedCpss.length}</i>
              </div>
              <hr className="my-2" />
              <div className="py-3 h-[60vh] overflow-y-scroll px-4">
                {cartProductSizeColors.map((cartProductSizeColor) => (
                  <ProductCart
                    handleRemoveProduct={handleRemoveProduct}
                    setChoosedCpss={setChoosedCpss}
                    key={cartProductSizeColor.id}
                    choosedCpss={choosedCpss}
                    {...cartProductSizeColor}
                    handleRemoveChoosedCps={handleRemoveChoosedCps}
                    handleAddChoosedCps={handleAddChoosedCps}
                  />
                ))}
                {cartProductSizeColors.length === 0 && (
                  <h1 className="text-center">
                    There are no products in the cart. Shopping{" "}
                    <Link to="/products/news" className="underline italic">
                      here
                    </Link>
                  </h1>
                )}
              </div>

              <div className="flex justify-center items-center px-4 py-4">
                <Pagination
                  page={page}
                  pageCount={metadata?.totalPages ?? 6}
                  handlePageClick={handlePageClick}
                />
              </div>
            </div>

            <div className="w-full lg:w-2/5 border-2 px-4 py-4">
              <h1 className="text-3xl font-extrabold text-gray-900">
                Order information
              </h1>
              <hr className="my-2" />
              <div className="mb-10">
                <div className="flex justify-between items-center mt-2">
                  <h1>Subtotal:</h1>
                  <span className="font-bold">
                    ${checkout.totalPrice.toLocaleString("de-DE")}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <h1>Product Discount:</h1>
                  <span className="font-bold">
                    ${checkout.discount.toLocaleString("de-DE")}
                  </span>
                </div>
                <div className="flex justify-between items-center my-2">
                  <h1>Shipping fee:</h1>
                  <span className="font-bold">$0</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between items-center">
                  <h1>Total Amount:</h1>
                  <span className="font-bold">
                    ${checkout.paymentFee.toLocaleString("de-DE")}
                  </span>
                </div>
                <div className="flex items-center flex-col">
                  <button
                    onClick={() => {
                      if (choosedCpss.length === 0) return;
                      setIsContinuted(true);
                    }}
                    className={`${
                      choosedCpss.length === 0
                        ? "cursor-not-allowed opacity-80"
                        : ""
                    } w-full my-5 border px-6 py-2 bg-black text-white font-bold`}
                  >
                    Checkout
                  </button>
                  <Link to={"/"}>
                    {/* <ReplyIcon />  */}
                    Continue shopping
                  </Link>
                </div>
              </div>
              <hr className="my-2" />
              <div className="py-2">
                <InputVoucher
                  handleCheckout={handleCheckout}
                  setCurrentCode={setCurrentCode}
                />
                <DisplayVouchers setCurrentCode={setCurrentCode} />
              </div>
            </div>
          </div>
        )}
      </div>
      {errorPopup && <PopupReloadPage />}
    </div>
  );
}
