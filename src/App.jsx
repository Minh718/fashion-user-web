
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/index.tsx';
import HomePage from "./pages/homePage/index.tsx";
import ProductDetailPage from "./pages/detailProduct/index.tsx";
import Login from "./pages/login/index.tsx";
import Products from "./pages/productsSubcategory/index.tsx";
import SignupForm from "./pages/register/index.tsx";
import OrderHistory from "./pages/order/OrderHistory.tsx";
import DetailOrderPage from "./pages/detailOrder/index.tsx";
function App() {

  const router = createBrowserRouter([

    {
      path: "/",
      element: <Home />,
      // loader: () => getAllCategories(),
      children: [
        {
          path: "/",
          element: <HomePage />,
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
      ]
    }]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
