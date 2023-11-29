import { createBrowserRouter } from "react-router-dom";
import Categories from "../components/web/Categories";
import Home from "../components/web/Home";
import AdminHome from "../components/admin/Home";
import AdminCategories from "../components/admin/Categories";
import AdminLayout from "./AdminLayout";
import Layout from "./Layout";
import Register from "../components/web/Register";
import Login from "../components/web/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // errorElement: <h2>404 page not found</h2>,
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "*",
        element: <h2>Page not found</h2>,
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
