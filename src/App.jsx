import { useEffect, useContext } from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { CartContextProvider } from "./Contexts/CartContext";
import { UserContext } from "./Contexts/UserContext";
import useTheme from "./hooks/useTheme";

import { router } from "./layouts/router";

function App() {
  const { setUserToken } = useContext(UserContext);
  const { theme, setTheme, checkTheme } = useTheme();

  useEffect(() => {
    setUserToken(localStorage.getItem("userToken"));
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    )
      setTheme("dark");
    else setTheme("light");
  }, []);

  useEffect(() => {
    localStorage.theme = theme;
    checkTheme();
  }, [theme]);

  return (
    <CartContextProvider>
      <RouterProvider router={router} />
    </CartContextProvider>
  );
}

export default App;
