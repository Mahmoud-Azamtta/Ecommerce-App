import React, { useContext, useRef, useState } from "react";
import * as yup from "yup";
import Input from "../shared/Input";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../Contexts/UserContext";
import { CartContext } from "../../Contexts/CartContext";

function MakeOrder() {
  const [backendError, setBackendError] = useState("");
  const { coupon } = useParams();
  const [isLoading, setLoading] = useState(false);
  const buttonRef = useRef(null);
  const { userToken } = useContext(UserContext);
  const { clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const validationSchema = yup.object({
    address: yup.string().required("Address is required"),
    phone: yup
      .string()
      .matches(/^\d{10}$/, "Phone number should be exactly 10 digits")
      .required("Phone number is required"),
  });

  const submitData = async (values) => {
    setLoading(true);
    buttonRef.current.disabled = true;
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/order`,
        values,
        { headers: { Authorization: `Tariq__${userToken}` } },
      );
      console.log(data);
      await clearCart();
      setLoading(false);
      buttonRef.current.disabled = false;
      navigate("/");
    } catch (error) {
      setBackendError(error.response.data.message);
      setLoading(false);
      buttonRef.current.disabled = false;
    }
  };

  const formik = useFormik({
    initialValues: {
      couponName: coupon ? coupon : "",
      address: "",
      phone: "",
    },
    onSubmit: submitData,
    validationSchema: validationSchema,
  });

  return (
    <div className="flex h-screen items-center justify-center bg-blob-scene-light bg-cover bg-no-repeat dark:bg-blob-scene-orange">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="md:8/12 w-11/12 rounded-3xl border border-gray-600 bg-white px-5 py-6 shadow-xl dark:bg-gray-900 sm:w-8/12 sm:p-10 lg:w-7/12 xl:w-5/12"
      >
        <h2 className="mb-3 border-b border-gray-300 pb-3 text-3xl font-bold text-gray-900 dark:border-gray-600 dark:text-gray-300">
          Finalize your order
        </h2>
        {backendError && (
          <p className="my-3 rounded-2xl border border-red-500 bg-red-200 py-2 text-center text-red-500 dark:bg-red-950">
            {backendError}
          </p>
        )}
        <form onSubmit={formik.handleSubmit}>
          <Input
            id="addrsss"
            title="Address"
            type="text"
            name="address"
            value={formik.values.address}
            errorMessage={formik.errors["address"]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isTouched={formik.touched["address"]}
          />
          <Input
            id="phone"
            title="Phone Number"
            type="text"
            name="phone"
            value={formik.values.phone}
            errorMessage={formik.errors["phone"]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isTouched={formik.touched["phone"]}
          />
          <button
            ref={buttonRef}
            type="submit"
            className={`relative mt-5 flex items-center justify-center rounded-full bg-amber-500 px-4 py-1 text-lg text-white shadow-md transition ${
              formik.isValid && formik.dirty
                ? "hover:scale-105 active:scale-95"
                : ""
            } disabled:bg-gray-400 dark:bg-orange-500 dark:disabled:bg-gray-500`}
            disabled={!formik.isValid || !formik.dirty}
          >
            <>
              {isLoading && (
                <span className="absolute flex items-center justify-center">
                  <span className="loader absolute h-8 w-8 before:h-8 before:w-8 before:border-black after:h-8 after:w-8 after:border-black dark:before:border-white dark:after:border-white"></span>
                </span>
              )}
              <span className={`${isLoading && "opacity-0"}`}>Confirm</span>
            </>
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default MakeOrder;
