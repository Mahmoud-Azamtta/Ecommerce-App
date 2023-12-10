import React, { useRef, useState } from "react";
import Input from "../shared/Input";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

function ResetPwd() {
  const [isLoading, setLoading] = useState(false);
  const buttonRef = useRef(null);
  const [backendError, setBackendError] = useState("");
  const navigate = useNavigate();
  const validationSchema = yup.object({
    email: yup
      .string()
      .required("Email is required")
      .email("Not a valid email"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    code: yup
      .string()
      .required("Code is required")
      .min(4, "Invalid code structure")
      .max(4, "Invalid code structure"),
  });

  const submitData = async (userData) => {
    setLoading(true);
    buttonRef.current.disabled = true;
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/auth/forgotPassword`,
        userData,
      );
      if (data.message == "success") {
        setLoading(false);
        initiatToast();
        navigate("/login");
        buttonRef.current.disabled = false;
      }
    } catch (error) {
      setBackendError(error.response.data.message);
      setLoading(false);
      buttonRef.current.disabled = false;
    }
  };

  const initiatToast = () => {
    toast.success("Password changed", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      code: "",
    },
    onSubmit: submitData,
    validationSchema: validationSchema,
  });

  const inputs = [
    {
      id: "email",
      title: "Email Address",
      type: "email",
      name: "email",
      placeholder: "Enter your email",
      value: formik.values.email,
    },
    {
      id: "password",
      title: "Password",
      type: "password",
      name: "password",
      placeholder: "Etner your password",
      value: formik.values.password,
    },
    {
      id: "code",
      title: "Reset Code",
      type: "text",
      name: "code",
      placeholder: "Enter reset code",
      value: formik.values.code,
    },
  ];

  return (
    <div className="flex h-screen items-center justify-center bg-blob-scene-light bg-cover bg-no-repeat dark:bg-blob-scene-orange">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="register md:8/12 w-11/12 rounded-3xl border border-gray-600 bg-white px-5 py-6 shadow-xl dark:bg-gray-900 sm:w-8/12 sm:p-10 lg:w-7/12 xl:w-5/12"
      >
        <h2 className="mb-3 border-b border-gray-300 pb-3 text-3xl font-bold text-gray-900 dark:border-gray-600 dark:text-gray-300">
          Reset Your Password
        </h2>
        {backendError && (
          <p className="mt-3 rounded-xl border border-red-500 bg-red-200 py-2 text-center text-red-500 dark:bg-red-950">
            {backendError}
          </p>
        )}
        <form
          action=""
          onSubmit={formik.handleSubmit}
          className="mt-3"
          encType="multipart/form-data"
        >
          {inputs.map((input, index) => (
            <Input
              key={index}
              {...input}
              errorMessage={formik.errors[input.name]}
              onChange={input.onChange || formik.handleChange}
              onBlur={formik.handleBlur}
              isTouched={formik.touched[input.name]}
            />
          ))}
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

export default ResetPwd;
