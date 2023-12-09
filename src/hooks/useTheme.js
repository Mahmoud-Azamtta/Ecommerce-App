import { useContext } from "react";
import ThemeContext from "../Contexts/ThemeProvider";

const useTheme = () => {
  return useContext(ThemeContext);
}

export default useTheme;