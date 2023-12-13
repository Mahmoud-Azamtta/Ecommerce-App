import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

export const CartContext = createContext(null);

export function CartContextProvider({ children }) {
  const token = localStorage.getItem("userToken");
  const [loading, setLoading] = useState(false);
  const [copoun, setCoupon] = useState("");
  const [count, setCount] = useState(0);
  const queryClient = useQueryClient();
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
      return error;
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
      console.log(data);
      setLoading(false);
      queryClient.refetchQueries("cart");
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
        {},
        { headers: { Authorization: `Tariq__${token}` } },
      );
      setLoading(false);
      queryClient.refetchQueries("cart");
      return data;
    } catch (error) {
      setLoading(false);
      initiatToast(true, "An error occurred");
      return error;
    }
  };

  const increaseQuantity = async (productId) => {
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/cart/incraseQuantity`,
        { productId },
        { headers: { Authorization: `Tariq__${token}` } },
      );
      return data;
    } catch (error) {
      return error;
    }
  };

  const decreaseQuantity = async (productId) => {
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/cart/decraseQuantity`,
        { productId },
        { headers: { Authorization: `Tariq__${token}` } },
      );
      await checkQuantity(data.cart.products, productId);
      return data;
    } catch (error) {
      return error;
    }
  };

  const checkQuantity = async (cart, productId) => {
    const quantity = cart.find(
      (product) => product.productId == productId,
    ).quantity;
    if (quantity == 0) {
      await removeProduct(productId);
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

  //FIXME: count in navbar does not update because getCartProducts
  // only runs on mount so I think it might have something to do with
  // the way I call getCartProducts in the first place
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
        increaseQuantity,
        decreaseQuantity,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
