import React, { useEffect, useState } from "react";
import Container from "../shared/Container";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import Loader from "../shared/Loader";
import Reviews from "./Reviews";

function ProductDetails() {
  const { productId } = useParams();
  const [averageRating, setAverageRating] = useState(0.0);
  const getProduct = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/products/${productId}`,
    );
    return data.product;
  };

  const productQuery = `product${productId}`;
  const { data: product, isLoading: productLoading } = useQuery(
    productQuery,
    getProduct,
  );

  const computeAverageRating = () => {
    let sum = 0;
    if (product.reviews.length) {
      product.reviews.forEach((review) => {
        sum += review.rating;
      });
      let avg = sum / product.reviews.length;
      setAverageRating(avg.toFixed(2));
    }
  };

  useEffect(() => {
    if (product) computeAverageRating();
  }, []);

  useEffect(() => {
    if (product) computeAverageRating();
  }, [product]);

  if (productLoading) {
    return (
      <div className="h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <Container>
      <div className="mb-10 grid grid-cols-2 gap-8 pt-20">
        <div className="img-wrapper col-span-2 flex h-fit justify-center rounded-3xl border border-gray-500 bg-gray-200 p-5 shadow-lg dark:border-gray-700 dark:bg-gray-900 sm:p-10 md:col-span-1 md:p-5 lg:p-10">
          <img
            src={product.mainImage.secure_url}
            alt="product image"
            className="rounded-2xl shadow-md"
          />
        </div>
        <div className="details col-span-2 h-fit rounded-3xl border border-gray-500 bg-gray-200 p-5 shadow-lg dark:border-gray-700 dark:bg-gray-900 sm:p-10 md:col-span-1 md:p-5 lg:p-10">
          <h1 className="border-b border-gray-400 pb-3 text-2xl font-bold capitalize dark:border-gray-700">
            {product.name}
          </h1>
          <div className="border-b border-gray-400 pb-3 dark:border-gray-700">
            <span
              className={`mt-3 inline-block rounded-full border px-3 py-1 text-lg ${
                product.stock > 0
                  ? "border-green-500 bg-green-200 text-green-500 dark:bg-green-900"
                  : "border-red-600 bg-red-200 text-red-600 dark:bg-red-950"
              }`}
            >
              {product.stock > 0 ? "In stock" : "Out of stock"}
            </span>
            <p className="mt-3 ">
              Average Rating:{" "}
              <span className="font-bold">{averageRating} / 5</span>
            </p>
          </div>
          <div className="pricing mt-3 border-b border-gray-400 pb-3 dark:border-gray-700">
            {product.discount ? (
              <p className="discount inline-block rounded-full bg-amber-400 px-3 py-0.5 text-lg font-bold text-black">
                {product.discount}%
              </p>
            ) : (
              ""
            )}
            <div className="flex items-end gap-3">
              <h3 className="text-xl font-bold">Pricing:</h3>
              {product.discount ? (
                <React.Fragment>
                  <p className="price">
                    <span className="text-md text-gray-500 line-through">
                      {product.price}$
                    </span>
                    <span className="ml-2 text-2xl font-bold text-amber-500">
                      {product.finalPrice}$
                    </span>
                  </p>
                </React.Fragment>
              ) : (
                <p className="text-2xl font-bold text-amber-500">
                  {product.price}$
                </p>
              )}
            </div>
          </div>
          <p className="mb-4 mt-5 border-b border-gray-400 pb-3 text-xs dark:border-gray-700 sm:text-base md:text-sm lg:text-base">
            {product.description}
          </p>
          <button
            className="mt-2 block w-fit rounded-lg bg-amber-500 px-10 py-1 text-lg text-white shadow-lg transition hover:scale-105 active:scale-95 dark:bg-orange-500"
            onClick={() => addProductToCart(product._id)}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <Reviews reviews={product.reviews} productId={product._id} />
    </Container>
  );
}

export default ProductDetails;
