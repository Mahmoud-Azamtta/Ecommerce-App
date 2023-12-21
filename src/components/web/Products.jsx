import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import { motion } from "framer-motion";
import Container from "../shared/Container";
import Loader from "../shared/Loader";
import ProductList from "./ProductList";
import Select from "../shared/Select";
import * as yup from "yup";
import { useFormik } from "formik";

function Products() {
  const sortingOptions = {
    Default: "",
    Price: "price",
    "Price descending": "-price",
    Discount: "discount",
    "Discount descending": "-discount",
  };

  const { id } = useParams("id");
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [pages, setPages] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [selectedSorting, setSelectedSorting] = useState("Default");
  const [filteredData, setFilteredData] = useState(null);
  const [filterLoader, setFilterLoader] = useState(false);
  const filtersSider = useRef(null);
  const arrowButton = useRef(null);
  let currentPage = searchParams.get("page");
  const validationSchema = yup.object({
    min: yup.number(),
    max: yup.number(),
  });

  const onSubmit = async (values) => {
    setFilterLoader(true);
    currentPage = 1;
    console.log(values);
    let apiURL = `${import.meta.env.VITE_API_URL}/products`;
    if (id) apiURL += `/category/${id}`;
    apiURL += `?page=${currentPage}`;
    if (values.min) {
      apiURL += `&price[gte]=${values.min}`;
    }
    if (values.max) {
      apiURL += `&price[lte]=${values.max}`;
    }
    if (selectedSorting !== "Default") {
      apiURL += `&sort=${sortingOptions[selectedSorting]}`;
    }
    try {
      const { data } = await axios.get(apiURL);
      setFilteredData(data.products);
    } catch (err) {
      console.log(err);
    } finally {
      setFilterLoader(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      min: "",
      max: "",
    },
    onSubmit,
    validationSchema,
  });

  const getProducts = async () => {
    let apiURL = `${import.meta.env.VITE_API_URL}/products`;
    if (id) apiURL += `/category/${id}`;

    const { data } = await axios.get(`${apiURL}?page=${currentPage}`);
    return data;
  };

  const queryKey = `products${id ? id : ""} ${currentPage}`;
  const { data, isLoading } = useQuery(queryKey, getProducts);

  const handleSiderButton = () => {
    filtersSider.current.classList.toggle("translate-x-0");
    arrowButton.current.classList.toggle("-rotate-90");
    arrowButton.current.classList.toggle("rotate-90");
  };

  useEffect(() => {
    if (filteredData) {
      onSubmit(formik.values);
      return;
    }
    if (data) {
      setItemsPerPage(data.page);
      setTotalItems(data.total);
      let temp = [];
      for (let i = 1; i <= totalItems / itemsPerPage; i++) temp.push(i);
      setPages(temp);
    }
  }, [data, itemsPerPage, totalItems]);

  useEffect(() => {
    if (selectedSorting === "Default") {
      setFilteredData(null);
      return;
    }
    onSubmit(formik.values);
  }, [selectedSorting]);

  useEffect(() => {
    const handleResise = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResise);

    return () => {
      window.removeEventListener("resize", handleResise);
    };
  }, []);

  if (isLoading || filterLoader) {
    return (
      <div className="h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="products min-h-screen"
    >
      {windowWidth <= 1100 && (
        <div
          ref={filtersSider}
          className="nav-items dakr:border right-l tems-center fixed top-32 -translate-x-full justify-between rounded-e-2xl border border-l-0 border-gray-400 bg-gray-200 p-3 transition-transform duration-300 ease-in-out dark:border-gray-600 dark:bg-gray-900"
        >
          <button
            className="absolute right-0 translate-x-full rounded-e-full border border-l-0 text-2xl dark:border-gray-700 dark:bg-gray-900 bg-gray-200 border-gray-400"
            onClick={handleSiderButton}
          >
            <svg
              ref={arrowButton}
              width="38px"
              height="38px"
              className="-rotate-90 rounded-full transition delay-200 duration-300 dark:fill-gray-300"
              viewBox="-8.5 0 32 32"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>angle-down</title>
              <path d="M7.28 20.040c-0.24 0-0.44-0.080-0.6-0.24l-6.44-6.44c-0.32-0.32-0.32-0.84 0-1.2 0.32-0.32 0.84-0.32 1.2 0l5.84 5.84 5.84-5.84c0.32-0.32 0.84-0.32 1.2 0 0.32 0.32 0.32 0.84 0 1.2l-6.44 6.44c-0.16 0.16-0.4 0.24-0.6 0.24z"></path>
            </svg>
          </button>
          <div className="flex flex-col gap-10">
            <div>
              <form action="" onSubmit={formik.handleSubmit}>
                <h2 className="mb-3 rounded-e-md pl-3 text-lg font-bold dark:bg-gray-700">
                  Price:{" "}
                </h2>
                <div className="flex gap-2">
                  <label htmlFor="min" className="text-lg font-bold">
                    From
                  </label>
                  <input
                    name="min"
                    id="min"
                    type="number"
                    min={0}
                    max={10000}
                    className="appearance:textfield] w-16 appearance-none rounded-md border border-gray-400 bg-gray-200 py-0.5 text-center text-lg dark:border-gray-700 dark:bg-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    onChange={formik.handleChange}
                    value={formik.values.min}
                  />
                  <label htmlFor="max" className="text-lg font-bold">
                    To
                  </label>
                  <input
                    name="max"
                    id="max"
                    type="number"
                    min={0}
                    max={10000}
                    className="appearance:textfield] w-16 appearance-none rounded-md border border-gray-400 bg-gray-200 py-0.5 text-center text-lg dark:border-gray-700 dark:bg-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    onChange={formik.handleChange}
                    value={formik.values.max}
                  />
                </div>
                <div className="mt-5 flex gap-3">
                  <button
                    type="submit"
                    className={`relative flex items-center justify-center rounded-full bg-amber-500 px-4 py-1 text-lg text-white shadow-md transition hover:scale-105 active:scale-95 dark:bg-orange-500`}
                  >
                    <>
                      {isLoading && (
                        <span className="loader absolute bottom-0 top-0 h-2 w-2 before:-left-3 before:h-2 before:w-2 before:border-black after:left-3 after:h-2 after:w-2 after:border-black dark:before:border-white dark:after:border-white"></span>
                      )}
                      <span className={`${isLoading && "opacity-0"}`}>
                        Filter
                      </span>
                    </>
                  </button>
                  <button
                    className={`relative flex items-center justify-center rounded-full bg-amber-500 px-4 py-1 text-lg text-white shadow-md transition hover:scale-105 active:scale-95 dark:bg-orange-500`}
                    onClick={() => formik.resetForm()}
                  >
                    clear
                  </button>
                </div>
              </form>
            </div>
            <div>
              <h2 className="mb-3 rounded-e-md pl-3 text-lg font-bold dark:bg-gray-700">
                Sort By:
              </h2>
              {Object.keys(sortingOptions).map((option, index) => (
                <button
                  key={index}
                  className={`my-1 block w-full rounded-md px-2 py-0.5 text-left transition hover:bg-gray-400 dark:hover:bg-gray-600 ${
                    option === selectedSorting
                      ? "bg-gray-300 dark:bg-gray-800"
                      : ""
                  }`}
                  onClick={() => setSelectedSorting(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      <Container>
        <div className="mb-10 flex flex-wrap items-center justify-between border-b border-gray-400 pb-5 pt-20 dark:border-gray-600">
          <h1 className="text-4xl font-bold">Products</h1>
          {windowWidth > 1100 && (
            <div className="flex flex-wrap gap-10">
              <div>
                <form
                  action=""
                  className="flex items-center gap-2"
                  onSubmit={formik.handleSubmit}
                >
                  <label htmlFor="min" className="text-lg font-bold">
                    From
                  </label>
                  <input
                    name="min"
                    id="min"
                    type="number"
                    min={0}
                    max={10000}
                    className="appearance:textfield] w-16 appearance-none rounded-md border border-gray-400 bg-gray-200 py-0.5 text-center text-lg dark:border-gray-700 dark:bg-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    onChange={formik.handleChange}
                    value={formik.values.min}
                  />
                  <label htmlFor="max" className="text-lg font-bold">
                    To
                  </label>
                  <input
                    name="max"
                    id="max"
                    type="number"
                    min={0}
                    max={10000}
                    className="appearance:textfield] w-16 appearance-none rounded-md border border-gray-400 bg-gray-200 py-0.5 text-center text-lg dark:border-gray-700 dark:bg-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    onChange={formik.handleChange}
                    value={formik.values.max}
                  />
                  <button
                    type="submit"
                    className={`relative flex items-center justify-center rounded-full bg-amber-500 px-4 py-1 text-lg text-white shadow-md transition hover:scale-105 active:scale-95 dark:bg-orange-500`}
                  >
                    <>
                      {isLoading && (
                        <span className="loader absolute bottom-0 top-0 h-2 w-2 before:-left-3 before:h-2 before:w-2 before:border-black after:left-3 after:h-2 after:w-2 after:border-black dark:before:border-white dark:after:border-white"></span>
                      )}
                      <span className={`${isLoading && "opacity-0"}`}>
                        Filter
                      </span>
                    </>
                  </button>
                  <button
                    className={`relative flex items-center justify-center rounded-full bg-amber-500 px-4 py-1 text-lg text-white shadow-md transition hover:scale-105 active:scale-95 dark:bg-orange-500`}
                    onClick={() => formik.resetForm()}
                  >
                    clear
                  </button>
                </form>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">Sort by:</span>
                <Select selected={selectedSorting} selectedText="Sort by:">
                  <div className="w-52 p-2">
                    {Object.keys(sortingOptions).map((option, index) => (
                      <button
                        key={index}
                        className={`my-1 block w-full rounded-md px-2 py-0.5 text-left transition hover:bg-gray-400 dark:hover:bg-gray-600 ${
                          option === selectedSorting
                            ? "bg-gray-300 dark:bg-gray-700"
                            : ""
                        }`}
                        onClick={() => setSelectedSorting(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </Select>
              </div>
            </div>
          )}
        </div>
        <ProductList products={filteredData ? filteredData : data.products} />
        <ul className="pagination my-10 flex justify-center gap-3">
          {pages.map((num, index) => (
            <Link key={index} to={`?page=${num}`}>
              <li
                className={`flex h-8 w-8 items-center justify-center rounded-full border border-gray-600 shadow-md dark:border-gray-400  dark:text-white sm:h-10 sm:w-10 ${
                  num == currentPage
                    ? "bg-amber-400 dark:bg-amber-600"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              >
                {num}
              </li>
            </Link>
          ))}
        </ul>
      </Container>
    </motion.section>
  );
}

export default Products;
