import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Input from "../shared/Input";

function Login({ saveCurrentUser }) {
  const navigate = useNavigate();
  const [backendError, setBackendError] = useState("");
  const validationSchema = yup.object({
    email: yup
      .string()
      .required("Email is required")
      .email("Not a valid email"),
    password: yup.string().required("Password is required"),
  });

  const submitData = async (user) => {
    const { data } = await axios
      .post(`${import.meta.env.VITE_API_URL}/auth/signin`, user)
      .catch((error) => {
        setBackendError(error.response.data.message);
      });
    if (data.message == "success") {
      initiatToast();
      formik.resetForm();
      localStorage.setItem("userToken", data.token);
      saveCurrentUser();
      navigate("/");
    }
  };

  const initiatToast = () => {
    toast.success("Login successfull", {
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
      userName: "",
      email: "",
      password: "",
      image: null,
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
      value: formik.values.email,
    },
    {
      id: "password",
      title: "Password",
      type: "password",
      name: "password",
      value: formik.values.password,
    },
  ];

  return (
    <>
      <div className="flex h-screen items-center justify-center bg-blob-scene-light bg-cover bg-no-repeat dark:bg-blob-scene-orange ">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          viewport={{once: true}}
          className="login md:8/12 w-11/12 rounded-3xl border border-gray-600 bg-white px-5 py-6 shadow-xl dark:bg-gray-900 sm:w-8/12 sm:p-10 lg:w-7/12 xl:w-5/12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-300">
            Login
          </h2>
          <hr className="my-2" />
          {backendError && (
            <p className="rounded-lg border border-red-500 bg-red-200 py-2 text-center text-red-500 dark:bg-red-950">
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isTouched={formik.touched[input.name]}
              />
            ))}
            <button
              type="submit"
              className="mt-3 rounded-full border bg-amber-500  px-4 py-1 text-white shadow transition hover:drop-shadow-lg active:bg-amber-600 disabled:bg-gray-200 disabled:text-gray-600 disabled:hover:drop-shadow-none"
              disabled={!formik.isValid || !formik.dirty}
            >
              Login
            </button>
            <p className="ml-3 mt-3 text-sm">
              Don't have an account?{" "}
              <Link to="/register">
                <span className="text-amber-500 hover:text-amber-600">
                  create one.
                </span>
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </>
  );
}

export default Login;
