import React from "react";
import Input from "../shared/Input";
import { useFormik } from "formik";
import Container from "../shared/Container";
import "../../css/register.css";
import * as yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";

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
      .post("https://ecommerce-node4.vercel.app/auth/signup", formData)
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
      image: "",
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
      <Container classes={"flex justify-center items-center my-16"}>
        <div className="register md:8/12 w-full rounded-3xl border p-10 shadow-lg lg:w-7/12 xl:w-6/12">
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <hr className="my-2" />
          <form
            action=""
            onSubmit={formik.handleSubmit}
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
              disabled={!formik.isValid}
            >
              CREATE
            </button>
          </form>
        </div>
      </Container>
    </>
  );
}

export default Register;
