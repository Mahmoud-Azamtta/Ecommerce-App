import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import axios from "axios";
import Input from "../shared/Input";
import Categories from "./Categories";
import { useNavigate } from "react-router-dom";

function ForgotPwd() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const buttonRef = useRef(null);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const submitEmail = async (values) => {
    setLoading(true);
    buttonRef.current.disabled = true;
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/auth/sendcode`,
        values,
      );
      console.log(data);
      if (data.message == "success") {
        setLoading(false);
        buttonRef.current.disabled = false;
        navigate("/reset-pwd");
      }
    } catch (error) {
      setLoading(false);
      buttonRef.current.disabled = false;
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) errors.email = "You must enter an email address";
      else if (!isValidEmail(values.email)) errors.email = "Not a valid email";
      return errors;
    },
    onSubmit: submitEmail,
  });

  const isValidEmail = (email) => {
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return pattern.test(email);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-blob-scene-light bg-cover bg-no-repeat dark:bg-blob-scene-orange ">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="login md:8/12 w-11/12 rounded-3xl border border-gray-600 bg-white px-5 py-6 shadow-xl dark:bg-gray-900 sm:w-8/12 sm:p-10 lg:w-7/12 xl:w-5/12"
      >
        <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-gray-300">
          What is your email address?
        </h2>
        <p className="mb-1">
          Enter an email address to send you the reset code
        </p>
        <form onSubmit={formik.handleSubmit}>
          <Input
            type="text"
            id="email"
            name="email"
            placeholder="Email address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isTouched={formik.touched["email"]}
            errorMessage={formik.errors["email"]}
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
                <span className="loader absolute bottom-0 top-0 h-2 w-2 before:-left-3 before:h-2 before:w-2 before:border-black after:left-3 after:h-2 after:w-2 after:border-black dark:before:border-white dark:after:border-white"></span>
              )}
              <span className={`${isLoading && "opacity-0"}`}>Send code</span>
            </>
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default ForgotPwd;
