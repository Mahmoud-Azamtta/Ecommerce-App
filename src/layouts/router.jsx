import { createBrowserRouter } from "react-router-dom";
import Register from "../components/web/Register";
import Login from "../components/web/Login";
import ForgotPwd from "../components/web/ForgotPwd";
import Home from "../components/web/Home";
import Categories from "../components/web/Categories";
import Products from "../components/web/Products";
import Cart from "../components/web/Cart";
import AdminLayout from "./AdminLayout";
import AdminHome from "../components/admin/Home";
import AdminCategories from "../components/admin/Categories";
import Layout from "./Layout";
import ProtectedRoute from "../components/web/ProtectedRoute";
import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import Profile from "../components/web/Profile";
import UserInfo from "../components/web/UserInfo";
import Contacts from "../components/web/Contacts";
import ResetPwd from "../components/web/ResetPwd";
import MakeOrder from "../components/web/MakeOrder";
import GetOrders from "../components/web/GetOrders";
import ProductDetails from "../components/web/ProductDetails";

const isLoggedin = () => {
  const { userToken } = useContext(UserContext);
  return userToken;
};

const isNotLoggedin = () => {
  const { userToken } = useContext(UserContext);
  return !userToken;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // errorElement: <h2>404 page not found</h2>,
    children: [
      {
        path: "register",
        element: (
          <ProtectedRoute condition={isNotLoggedin} replacementRoute={"/"}>
            <Register />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: (
          <ProtectedRoute condition={isNotLoggedin} replacementRoute={"/"}>
            <Login />
          </ProtectedRoute>
        ),
      },
      {
        path: "forgot-pwd",
        element: <ForgotPwd />,
      },
      {
        path: "reset-pwd",
        element: <ResetPwd />,
      },
      {
        // can be written in two ways
        // path: "/"
        // or index: true
        index: true,
        element: <Home />,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute condition={isLoggedin} replacementRoute={"/login"}>
            <Profile />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <UserInfo />,
          },
          {
            path: "user-contacts",
            element: <Contacts />,
          },
        ],
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "products/:id",
        element: <Products />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "product/:productId",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute condition={isLoggedin} replacementRoute={"/login"}>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "make-order/:coupon",
        element: (
          <ProtectedRoute condition={isLoggedin} replacementRoute={"/login"}>
            <MakeOrder />
          </ProtectedRoute>
        ),
      },
      {
        path: "make-order",
        element: (
          <ProtectedRoute condition={isLoggedin} replacementRoute={"/login"}>
            <MakeOrder />
          </ProtectedRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <ProtectedRoute condition={isLoggedin} replacementRoute={"/login"}>
            <GetOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: (
          <div className="flex h-screen items-center justify-center">
            <img src="/images/confused-emoji.svg" alt="broken link" />
            <h2 className="pl-5 text-5xl">Page not found</h2>
          </div>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    errorElement: <h2>404 page not found</h2>,
    children: [
      {
        path: "home",
        element: <AdminHome />,
      },
      {
        path: "categories",
        element: <AdminCategories />,
      },
      {
        path: "*",
        element: <h2>Page not found</h2>,
      },
    ],
  },
]);
