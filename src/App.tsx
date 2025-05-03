import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Home from "./pages/index";
import HomePage from "./pages/homePage/index";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailPage from "./pages/detailProduct/index";
import Login from "./pages/login/index";
import Products from "./pages/productsSubcategory/index";
import SignupPage from "./pages/register/index";
import OrderHistory from "./pages/order/OrderHistory";
import DetailOrderPage from "./pages/detailOrder/index";
import ProductsCart from "./pages/cart/index";
import PaymentSuccessPage from "./pages/paymentSuccess/index";
import PaymentFailPage from "./pages/paymentFail/index";
import NotFoundPage from "./pages/404/index";
import { ReactNode, useCallback, useEffect } from "react";
import { initializeUser } from "./store/user/userSlice.js";
import React from "react";
import Loading from "./components/Loading";
import { getListProductsForHomePage } from "./services/productService";
import Authenticate from "./pages/authenticate/index";
import { AppDispatch, RootState, store } from "./store/index";
import { getAllProductOfCart } from "./services/cartService";
import ProfileManagement from "./pages/profile/index";
import SuccessOrderPage from "./pages/orderSuccess/index";
import LoadingBigger from "./components/LoadingBigger";
interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state: any) => state.user);

  if (loading) {
    return <LoadingBigger />; // Replace with a spinner or placeholder if needed
  }

  return isAuthenticated ? children : <Navigate to="/signin" />;
};
function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, loading } = useSelector(
    (state: RootState) => state.user
  );

  // Use useCallback to memoize initializeUser function
  const memoizedInitializeUser = useCallback(() => {
    initializeUser(dispatch);
  }, [dispatch]); // Only recreate if `dispatch` changes (which should not happen)

  // useEffect now uses the memoized function, ensuring no unnecessary re-renders
  useEffect(() => {
    memoizedInitializeUser();
  }, [memoizedInitializeUser]);
  const router = createBrowserRouter([
    {
      path: "/authenticate",
      element: <Authenticate />,
      // loader: teamLoader,
    },
    {
      path: "/",
      element: <Home />,
      // loader: () => getAllCategories(),
      children: [
        {
          path: "/",
          element: <HomePage />,
          loader: () => getListProductsForHomePage(),
        },
        {
          path: "/order/:id",
          element: (
            <PrivateRoute>
              <DetailOrderPage />,
            </PrivateRoute>
          ),
        },
        {
          path: "/orders",
          element: (
            <PrivateRoute>
              <OrderHistory />,
            </PrivateRoute>
          ),
        },
        {
          path: "/user",

          element: (
            <PrivateRoute>
              <ProfileManagement />,
            </PrivateRoute>
          ),
        },
        {
          path: "/products/:thump",
          element: <Products />,
        },
        {
          path: "/signin",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <SignupPage />,
        },
        {
          path: "/product/:id",
          element: <ProductDetailPage />,
        },
        {
          path: "/cart",
          element: (
            <PrivateRoute>
              <ProductsCart />
            </PrivateRoute>
          ),
          loader: () => {
            const state = store.getState(); // Access the store directly here
            const isAuthenticated = state.user.isAuthenticated;
            if (isAuthenticated) return getAllProductOfCart(0);
            return null;
          },
        },
        {
          path: "/payment-success/:id",
          element: (
            <PrivateRoute>
              <PaymentSuccessPage />
            </PrivateRoute>
          ),
        },
        {
          path: "/payment-fail",
          element: (
            <PrivateRoute>
              <PaymentFailPage />
            </PrivateRoute>
          ),
        },
        {
          path: "/order-success",
          element: (
            <PrivateRoute>
              <SuccessOrderPage />
            </PrivateRoute>
          ),
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
