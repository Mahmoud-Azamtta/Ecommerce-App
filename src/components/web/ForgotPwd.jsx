import React, { useState } from "react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import axios from "axios";
import Input from "../shared/Input";
import Categories from "./Categories";

function ForgotPwd() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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
    onSubmit: (values) => {
      submitEmail;
    },
  });

  const submitEmail = async (e) => {
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/auth/sendcode`,
      );
    } catch (error) {
      console.log(error);
    }
  };

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
            className={`mt-3 block rounded-full bg-amber-500 px-4 py-1 text-lg text-white shadow-md transition ${
              formik.isValid && formik.dirty
                ? "hover:scale-105 active:scale-95"
                : ""
            } disabled:bg-gray-400 dark:bg-orange-500 dark:disabled:bg-gray-500`}
            disabled={!formik.isValid || !formik.dirty}
          >
            Send Code
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default ForgotPwd;
