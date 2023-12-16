import React, { useContext, useRef, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Input from "../shared/Input";
import { UserContext } from "../../Contexts/UserContext";

function Login() {
  const navigate = useNavigate();
  const buttonRef = useRef(null);
  const [isLoading, setLoading] = useState(false);
  const { setUserToken } = useContext(UserContext);
  const [backendError, setBackendError] = useState("");
  const validationSchema = yup.object({
    email: yup
      .string()
      .required("Email is required")
      .email("Not a valid email"),
    password: yup.string().required("Password is required"),
  });

  const submitData = async (user) => {
    setLoading(true);
    buttonRef.current.disabled = true;
    const { data } = await axios
      .post(`${import.meta.env.VITE_API_URL}/auth/signin`, user)
      .catch((error) => {
        setBackendError(error.response.data.message);
        setLoading(false);
        buttonRef.current.disabled = false;
      });
    if (data.message == "success") {
      initiatToast();
      formik.resetForm();
      localStorage.setItem("userToken", data.token);
      setLoading(false);
      buttonRef.current.disabled = false;
      setUserToken(data.token);
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
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="login md:8/12 w-11/12 rounded-3xl border border-gray-600 bg-white px-5 py-6 shadow-xl dark:bg-gray-900 sm:w-8/12 sm:p-10 lg:w-7/12 xl:w-5/12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-300">
            Login
          </h2>
          <hr className="my-2" />
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isTouched={formik.touched[input.name]}
              />
            ))}
            <Link to="/forgot-pwd">
              <span className="text-sm hover:text-amber-500 active:text-amber-600">
                Forgot your password?
              </span>
            </Link>
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
                    <span className="loader absolute top-0 bottom-0 h-2 w-2 before:h-2 before:-left-3 before:w-2 before:border-black after:h-2 after:w-2 after:left-3 after:border-black dark:before:border-white dark:after:border-white"></span>
                )}
                <span className={`${isLoading && "opacity-0"}`}>Login</span>
              </>
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
