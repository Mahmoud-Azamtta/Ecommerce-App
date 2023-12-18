import React, { useContext, useRef, useState } from "react";
import Error from "../shared/Error";
import Dropdown from "../shared/Dropdown";
import { format, sub } from "date-fns";
import { useFormik } from "formik";
import * as yup from "yup";
import { UserContext } from "../../Contexts/UserContext";
import axios from "axios";
import { toast } from "react-toastify";

function Reviews({ reviews, productId }) {
  const buttonRef = useRef(null);
  const { userToken } = useContext(UserContext);
  const [isLoading, setLoading] = useState(false);
  const validationSchema = yup.object({
    comment: yup
      .string()
      .required("Comment is required")
      .max(300, "Only 300 characters are allowed"),
    rating: yup
      .number()
      .required("You have to give a rating if you want to review this product.")
      .min(0, "Rate from 1 to 5")
      .max(5, "Rate from 1 to 5"),
  });
  const submitReview = async (values) => {
    console.log(values);
    setLoading(true);
    buttonRef.current.disabled = true;
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/products/${productId}/review`,
        values,
        { headers: { Authorization: `Tariq__${userToken}` } },
      );
      initiatToast(false, "You reviewed a product");
    } catch (error) {
      initiatToast(true, error.response.data.message);
    } finally {
      setLoading(false);
      buttonRef.current.disabled = false;
      formik.resetForm();
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

  const formik = useFormik({
    initialValues: {
      comment: "",
      rating: 0,
    },
    validationSchema: validationSchema,
    onSubmit: submitReview,
  });

  return (
    <div className="mb-10 rounded-3xl border border-gray-500 bg-gray-200 p-5 shadow-lg dark:border-gray-700 dark:bg-gray-900 sm:p-8 md:p-10">
      <Dropdown title="Reviews" buttonFontSize="text-xl">
        {reviews ? (
          reviews.length ? (
            reviews.map((review, index) => (
              <div
                key={index}
                className="review mb-5 flex gap-5 rounded-2xl border border-gray-400 bg-gray-100 px-3 py-2 dark:border-gray-700 dark:bg-gray-800 sm:px-5"
              >
                <div className="profile-picture flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gray-100 sm:h-14 sm:w-14 md:h-20 md:w-20">
                  <img
                    src={review.createdBy.image.secure_url}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="review-details md:text-md py-2 text-sm">
                  <p className="break-words">
                    <span className="font-bold capitalize">
                      {review.createdBy.userName}:{" "}
                    </span>
                    {review.comment}
                  </p>
                  <p>
                    <span className="font-bold">Rating: </span>
                    {review.rating}/5
                  </p>
                  <p className="text-gray-500">
                    {format(new Date(review.createdAt), "MMM dd, yyyy HH:mm")}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex h-52 items-center justify-center">
              <h2 className="font-bold">Product has no reviews...</h2>
            </div>
          )
        ) : (
          <Error message="Could not load reviews" />
        )}
      </Dropdown>
      <div className="new-review">
        <h2 className="mb-3 mt-2 border-t border-gray-400 pt-3 text-xl font-bold dark:border-gray-700">
          Review This Product
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <span>Rating: </span>
            <input
              name="rating"
              id="rating"
              type="number"
              min={0}
              max={5}
              className="appearance:textfield] w-8 appearance-none rounded-md border border-gray-400 bg-gray-100 text-center text-lg dark:border-gray-700 dark:bg-gray-800 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span> / 5</span>
            {formik.errors["rating"] && formik.touched["rating"] && (
              <p className="text-sm text-red-500">{formik.errors["rating"]}</p>
            )}
          </div>
          <textarea
            name="comment"
            id="comment"
            cols="30"
            rows="5"
            placeholder="Tried this product? Tell us how was it?"
            className="w-full resize-none rounded-xl border border-gray-400 bg-gray-100 px-3 py-2 placeholder:text-sm dark:border-gray-700 dark:bg-gray-800"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></textarea>
          {formik.errors["comment"] && formik.touched["comment"] && (
            <p className="text-sm text-red-500">{formik.errors["comment"]}</p>
          )}
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
              <span className={`${isLoading && "opacity-0"}`}>Post review</span>
            </>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Reviews;
