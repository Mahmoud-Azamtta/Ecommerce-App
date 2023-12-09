import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserContextProvider } from "./Contexts/UserContext.jsx";
import { ThemeProvider } from "./Contexts/ThemeProvider.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <UserContextProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <ToastContainer />
          <App />
        </QueryClientProvider>
      </ThemeProvider>
    </UserContextProvider>
  </>,
);
