import React from "react";
import Input from "../shared/Input";
import { useFormik } from "formik";
import Container from "../shared/Container";
import * as yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Register() {
  const validationSchema = yup.object({
    userName: yup
      .string()
      .required("Username is required")
      .min(5, "Username must be at least 5 characters")
      .max(25, "Username must be at most 25 characters"),
    email: yup
      .string()
      .required("Email is required")
      .email("Not a valid email"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    image: yup.mixed().required("Profile picture is required"),
  });

  const submitData = async (user) => {
    const formData = new FormData();
    formData.append("userName", user.userName);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("image", user.image);

    const { data } = await axios
      .post(`${import.meta.env.VITE_API_URL}/auth/signup`, formData)
      .catch((error) => {
        console.log(error);
      });
    if (data.message == "success") {
      initiatToast();
      formik.resetForm();
    }
  };

  const initiatToast = () => {
    toast.success("Account created successfuly", {
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

  const handleImageChange = (event) => {
    formik.setFieldValue("image", event.target.files[0]);
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
      id: "userName",
      title: "Username",
      type: "text",
      name: "userName",
      value: formik.values.userName,
    },
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
    {
      id: "image",
      title: "Profile Picture",
      type: "file",
      name: "image",
      onChange: handleImageChange,
    },
  ];

  return (
    <>
      <div className="flex h-screen items-center justify-center bg-blob-scene-light bg-cover bg-no-repeat dark:bg-blob-scene-orange">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          viewport={{ once: true }}
          className="register md:8/12 w-11/12 rounded-3xl border border-gray-600 bg-white px-5 py-6 shadow-xl dark:bg-gray-900 sm:w-8/12 sm:p-10 lg:w-7/12 xl:w-5/12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-300">
            Create Account
          </h2>
          <hr className="my-2" />
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
              type="submit"
              className="mt-3 rounded-full border bg-amber-500  px-4 py-1 text-white shadow transition hover:drop-shadow-lg active:bg-amber-600 disabled:bg-gray-200 disabled:text-gray-600 disabled:hover:drop-shadow-none"
              disabled={!formik.isValid || !formik.dirty}
            >
              CREATE
            </button>
            <p className="ml-3 mt-3 text-sm">
              Already have an account?{" "}
              <Link to="/login">
                <span className="text-amber-500 hover:text-amber-600">
                  login.
                </span>
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </>
  );
}

export default Register;
