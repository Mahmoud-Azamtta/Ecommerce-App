import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { motion } from "framer-motion";
import Container from "../shared/Container";
import Error from "../shared/Error";
import Loader from "../shared/Loader";

function Products() {
  const { id } = useParams("id");
  const getProducts = async () => {
    let apiURL = `${import.meta.env.VITE_API_URL}/products`;
    if (id) apiURL += `/category/${id}`;

    const { data } = await axios.get(apiURL);
    return data.products;
  };

  const queryKey = id ? ["products", id] : "products";
  const { data, isLoading } = useQuery(queryKey, getProducts);

  if (isLoading) {
    return <Loader />;
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
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
          {data?.length ? (
            data?.map((product) => (
              <div
                key={product._id}
                className="product border border-gray-600 bg-gray-300 p-5 shadow-lg dark:bg-gray-900 dark:border-gray-600 rounded-lg"
              >
                <img
                  src={product.mainImage.secure_url}
                  alt="product image"
                  className="w-full rounded-lg"
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = "/images/image-not-found.png";
                  }}
                />
                <div className="product-description">
                  <h2 className="mt-2 text-lg font-bold">{product.name}</h2>
                  {product.discount ? (
                    <React.Fragment>
                      <p className="discount inline-block rounded-full bg-amber-400 px-3 py-0.5 text-lg font-bold text-black">
                        {product.discount}%
                      </p>
                      <p className="price">
                        <span className="text-sm text-gray-500 line-through">
                          {product.price}$
                        </span>
                        <span className="ml-2 font-bold dark:text-amber-500">
                          {product.finalPrice}$
                        </span>
                      </p>
                    </React.Fragment>
                  ) : (
                    <p className="font-bold dark:text-amber-500 text-lg">
                      {product.price}$
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <Error message="Could not load products" />
          )}
        </div>
      </Container>
    </motion.section>
  );
}

export default Products;