import { createContext, useState } from "react";

const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("");

  const checkTheme = () => {
    if (localStorage.theme === "dark")
      document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, checkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;