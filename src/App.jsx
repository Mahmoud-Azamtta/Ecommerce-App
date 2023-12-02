import { useState, useEffect } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Categories from "./components/web/Categories";
import Home from "./components/web/Home";
import AdminHome from "./components/admin/Home";
import AdminCategories from "./components/admin/Categories";
import AdminLayout from "./layouts/AdminLayout";
import Layout from "./layouts/Layout";
import Register from "./components/web/Register";
import Login from "./components/web/Login";
import { jwtDecode } from "jwt-decode";
import Products from "./components/web/Products";

function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("");
  const saveCurrentUser = () => {
    const token = localStorage.getItem("userToken");
    const decoded = jwtDecode(token);
    setUser(decoded);
  };

  const checkTheme = () => {
    console.log(localStorage.theme);
    if (localStorage.theme === "dark")
      document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  };

  useEffect(() => {
    if (localStorage.getItem("userToken")) saveCurrentUser();
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches))
      setTheme("dark");
    else 
      setTheme("light"); 
  }, []);

  useEffect(() => {
    localStorage.theme = theme;
    checkTheme();
  }, [theme]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout user={user} setUser={setUser} setTheme={setTheme} />,
      // errorElement: <h2>404 page not found</h2>,
      children: [
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login saveCurrentUser={saveCurrentUser} />,
        },
        {
          // can be written in two ways
          // path: "/",
          index: true,
          element: <Home />,
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

  return <RouterProvider router={router} />;
}

export default App;
