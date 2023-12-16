import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import { motion } from "framer-motion";
import Container from "../shared/Container";
import Loader from "../shared/Loader";
import ProductList from "./ProductList";

function Products() {
  const { id } = useParams("id");
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [pages, setPages] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page");

  const getProducts = async () => {
    let apiURL = `${import.meta.env.VITE_API_URL}/products`;
    if (id) apiURL += `/category/${id}`;

    const { data } = await axios.get(`${apiURL}?page=${currentPage}`);
    return data;
  };

  const queryKey = id ? ["products", id] : "products" + currentPage;
  const { data, isLoading } = useQuery(queryKey, getProducts);

  useEffect(() => {
    if (data) {
      setItemsPerPage(data.page);
      setTotalItems(data.total);
      let temp = [];
      for (let i = 1; i <= totalItems / itemsPerPage; i++) temp.push(i);
      setPages(temp);
    }
  }, [data, itemsPerPage, totalItems]);

  if (isLoading) {
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
      <Container>
        <h1 className="pb-5 pt-20 text-4xl font-bold">Products</h1>
        <hr className="mb-10" />
        <ProductList products={data.products} />
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
