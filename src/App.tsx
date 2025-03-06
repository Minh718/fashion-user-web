import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/index.tsx";
import HomePage from "./pages/homePage/index.tsx";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailPage from "./pages/detailProduct/index.tsx";
import Login from "./pages/login/index.tsx";
import Products from "./pages/productsSubcategory/index.tsx";
import SignupForm from "./pages/register/index.tsx";
import OrderHistory from "./pages/order/OrderHistory.tsx";
import DetailOrderPage from "./pages/detailOrder/index.tsx";
import ProductsCart from "./pages/cart/index.tsx";
import PaymentSuccessPage from "./pages/paymentSuccess/index.tsx";
import PaymentFailPage from "./pages/paymentFail/index.tsx";
import NotFoundPage from "./pages/404/index.tsx";
import { ReactNode, useEffect } from "react";
import { initializeUser } from "./store/user/userSlice.js";
import React from "react";
import Loading from "./components/Loading.tsx";
import { getListProductsForHomePage } from "./services/productService.tsx";
interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state: any) => state.user);

  if (loading) {
    return <Loading />; // Replace with a spinner or placeholder if needed
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};
function App() {
  // const dispatch = useDispatch();
  // const { isAuthenticated, loading } = useSelector((state) => state.user);
  // useEffect(() => {
  //   dispatch(initializeUser());
  // }, [dispatch]);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      // loader: () => getAllCategories(),
      children: [
        {
          path: "/",
          element: <HomePage />,
          // loader: () => getListProductsForHomePage(),
        },
        {
          path: "/order/:id",
          element: <DetailOrderPage />,
        },
        {
          path: "/orders",
          element: <OrderHistory />,
        },
        {
          path: "/products/:thump",
          element: <Products />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <SignupForm />,
        },
        {
          path: "/product/:id",
          element: <ProductDetailPage />,
        },
        {
          path: "/cart",
          element: <ProductsCart />,
        },
        {
          path: "/payment/success",
          element: <PaymentSuccessPage />,
        },
        {
          path: "/payment/fail",
          element: <PaymentFailPage />,
        },
        {
          path: "/*",
          element: <NotFoundPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
