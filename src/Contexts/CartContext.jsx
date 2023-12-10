import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const CartContext = createContext(null);

export function CartContextProvider({ children }) {
  const token = localStorage.getItem("userToken");
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const addProductToCart = async (productId) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/cart`,
        { productId },
        { headers: { Authorization: `Tariq__${token}` } },
      );
      if (data.message == "success") {
        initiatToast(false, "Product added to Cart");
      }
    } catch (error) {
      initiatToast(true, "Couldn't add product to Cart");
    }
  };

  const getCartProducts = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
        headers: { Authorization: `Tariq__${token}` },
      });
      setCount(data.count);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const removeProduct = async (productId) => {
    setLoading(true);
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/cart/removeItem`,
        { productId },
        { headers: { Authorization: `Tariq__${token}` } },
      );
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      return error;
    }
  };

  const clearCart = async () => {
    setLoading(true);
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/cart/clear`,
        { header: { Authorization: `Tariq__${token}` } },
      );
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      initiatToast(true, "An error occurred");
      return error;
    }
  };

  const initiatToast = (isError, message) => {
    const currentTheme = localStorage.getItem("theme");
    if (isError) {
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: `${currentTheme == "dark" ? "dark" : "light"}`,
      });
    } else {
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: `${currentTheme == "dark" ? "dark" : "light"}`,
      });
    }
  };

  useEffect(() => {
    getCartProducts();
  }, []);

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        getCartProducts,
        removeProduct,
        count,
        clearCart,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
