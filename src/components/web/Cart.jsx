import React, { useContext, useState } from "react";
import Input from "../shared/Input";
import Container from "../shared/Container";
import { CartContext } from "../../Contexts/CartContext";
import { useQuery } from "react-query";
import Loader from "../shared/Loader";
import Error from "../shared/Error";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Cart() {
  const [coupon, setCoupon] = useState("");
  const [shippingOption, setShippingOoption] = useState("freeShipping");
  const navigate = useNavigate();
  const {
    getCartProducts,
    removeProduct,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    loading,
  } = useContext(CartContext);

  const getCart = async () => {
    const result = await getCartProducts();
    return result;
  };
  const { data, isLoading } = useQuery("cart", getCart);

  const removeCartItem = async (productId) => {
    const result = await removeProduct(productId);
  };

  const clearAll = async () => {
    const result = await clearCart();
  };

  if (isLoading) {
    return (
      <div className="h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
      >
        <h2 className="border-gray- border-b pb-5 mb-3 pt-20 text-4xl font-bold dark:border-gray-700">
          Prodcuts in Cart
        </h2>
        <div className="grid min-h-screen xl:grid-cols-6 lg:grid-cols-8 gap-5">
          {!loading ? (
            <div className="xl:col-span-4 lg:col-span-5">
              {data?.products ? (
                data.products.length ? (
                  data.products.map((product) => (
                    <div
                      key={product._id}
                      className="product my-5 rounded-xl border border-gray-300 bg-gray-200 p-5 shadow-lg dark:border-gray-700 dark:bg-gray-900"
                    >
                      <div className="grid grid-cols-6 gap-5">
                        <div className="product-image xl:col-span-1 md:col-span-1 sm:col-span-2 col-span-3 flex items-center">
                          <img
                            src={product.details.mainImage.secure_url}
                            alt="product picture"
                            className="w-full rounded-md shadow-lg"
                          />
                        </div>
                        <div className="product-info xl:col-span-2 md:col-span-5 sm:col-span-4 col-span-3 flex flex-col justify-center">
                          <h3 className="product-title text-lg font-bold">
                            {product.details.name}
                          </h3>
                          <p className="color">
                            Color:{" "}
                            <span className="picked-color">
                              {product.details.colors.length
                                ? product.details.colors[0]
                                : "default"}
                            </span>
                          </p>
                          <button
                            className="mt-2 w-fit rounded-lg border border-red-600 bg-red-200 p-2 text-red-600 shadow-lg transition hover:scale-105 active:scale-95 dark:bg-red-950"
                            onClick={() => removeCartItem(product.productId)}
                          >
                            <img src="/images/trash.svg" alt="remove icon" />
                          </button>
                        </div>
                        <div className="quantity flex xl:col-span-1 col-span-2 justify-center xl:border-x border-r border-gray-300 dark:border-gray-700">
                          <div className="buttons flex xl:flex-col gap-2 flex-row-reverse items-center justify-center ">
                            <button
                              className="increase xl:rotate-180 -rotate-90 rounded-full bg-gray-300 p-0.5 text-lg hover:bg-gray-100 dark:bg-gray-300 dark:hover:bg-gray-400"
                              onClick={() =>
                                increaseQuantity(product.productId)
                              }
                            >
                              <img src="/images/angle-down.svg" alt="icon" />
                            </button>
                            <span className="amount text-lg">
                              {product.quantity}
                            </span>
                            <button
                              className="decrease hello xl:rotate-0 rotate-90 rounded-full bg-gray-300 p-0.5 text-lg hover:bg-gray-100 dark:bg-gray-300 dark:hover:bg-gray-400"
                              onClick={() =>
                                decreaseQuantity(product.productId)
                              }
                            >
                              <img src="/images/angle-down.svg" alt="" />
                            </button>
                          </div>
                        </div>
                        <p className="price my-auto xl:col-span-1 col-span-2 text-center md:text-lg text-md">
                          <span className="font-bold">Price:</span>{" "}
                          <span>{product.details.price}</span>$
                        </p>
                        <p className="sub-total my-auto xl:col-span-1 col-span-2 text-center md:text-lg text-md">
                          <span className="font-bold">Total:</span>{" "}
                          <span>{product.details.finalPrice}</span>$
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex h-1/2 w-full items-center justify-center">
                    <p className="text-lg font-bold">Cart is empty...</p>
                  </div>
                )
              ) : (
                <Error message={"Couldn't load cart"} />
              )}
            </div>
          ) : (
            <div className="col-span-4 h-1/2">
              <Loader />
            </div>
          )}
          <div className="xl:col-span-2 lg:col-span-3">
            <div className="summary my-5 rounded-xl border border-gray-300 bg-gray-200 p-5 shadow-lg dark:border-gray-700 dark:bg-gray-900">
              <h2 className="mb-3 border-b border-gray-300 pb-3 text-center text-2xl font-bold dark:border-gray-700">
                Cart Summary
              </h2>
              <div className="coupon mb-3 border-b border-gray-300 pb-2 dark:border-gray-700">
                <Input
                  id="coupon"
                  title="Enter a coupon"
                  type="text"
                  placeholder="Your coupon goes here"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />
              </div>
              <div className="shipping mb-3 border-b border-gray-300 pb-3 dark:border-gray-700">
                <label
                  htmlFor="freeShipping"
                  className={`group relative mt-3 flex cursor-pointer items-center rounded-lg border-2 ${
                    shippingOption === "freeShipping"
                      ? "border-amber-500 text-amber-500 dark:border-orange-500 dark:text-orange-500"
                      : "border-gray-300 text-gray-700 dark:border-gray-700 dark:text-gray-300"
                  } px-2 py-2 transition hover:border-amber-400 hover:text-amber-400 dark:hover:border-orange-400 dark:hover:text-orange-400`}
                >
                  <input
                    type="radio"
                    id="freeShipping"
                    name="shippingOption"
                    value="freeShipping"
                    className="mx-3 opacity-0"
                    onChange={(e) => setShippingOoption(e.target.value)}
                  />
                  <span className="absolute left-5 h-3 w-3 rounded-full bg-gray-400 dark:bg-gray-200"></span>
                  {shippingOption === "freeShipping" && (
                    <React.Fragment>
                      <span className="absolute left-4 h-5 w-5 rounded-full border-2 border-amber-500 dark:border-orange-500"></span>
                    </React.Fragment>
                  )}
                  Free Shipping
                </label>
                <label
                  htmlFor="expressShipping"
                  className={`group relative mt-3 flex cursor-pointer items-center rounded-lg border-2 ${
                    shippingOption === "expressShipping"
                      ? "border-amber-500 text-amber-500 dark:border-orange-500 dark:text-orange-500"
                      : "border-gray-300 text-gray-700 dark:border-gray-700 dark:text-gray-300"
                  } px-2 py-2 transition hover:border-amber-400 hover:text-amber-400 dark:hover:border-orange-400 dark:hover:text-orange-400`}
                >
                  <input
                    type="radio"
                    id="expressShipping"
                    name="shippingOption"
                    value="expressShipping"
                    className="mx-3 opacity-0"
                    onChange={(e) => setShippingOoption(e.target.value)}
                  />
                  <span className="absolute left-5 h-3 w-3 rounded-full bg-gray-400 dark:bg-gray-200"></span>
                  {shippingOption === "expressShipping" && (
                    <React.Fragment>
                      <span className="absolute left-4 h-5 w-5 rounded-full border-2 border-amber-500 dark:border-orange-500"></span>
                    </React.Fragment>
                  )}
                  Express Shipping
                </label>
              </div>
              <div className="mb-2 flex flex-nowrap justify-between text-lg">
                <p>Subtotal</p>
                <span>
                  {data?.products.reduce((sum, product) => {
                    return sum + product.details.price;
                  }, 0) + (shippingOption == "expressShipping" ? 30 : 0)}
                  $
                </span>
              </div>
              <div className="total mb-2 flex flex-nowrap justify-between text-xl font-bold">
                <p>Total</p>
                <span>
                  {data?.products.reduce((sum, product) => {
                    return sum + product.details.finalPrice;
                  }, 0) + (shippingOption == "expressShipping" ? 30 : 0)}
                  $
                </span>
              </div>
              <div className="buttons grid grid-cols-5 gap-5">
                <button
                  className={`col-span-3 rounded-md bg-amber-500 py-1 text-lg text-white shadow-md transition ${
                    data?.products.length
                      ? "hover:scale-105 active:scale-95"
                      : ""
                  } disabled:bg-gray-400 dark:bg-orange-500 dark:disabled:bg-gray-500`}
                  disabled={!data?.products.length}
                  onClick={() => navigate(`/make-order/${coupon}`)}
                >
                  Checkout
                </button>
                <button
                  className={`flex col-span-2 items-center justify-center rounded-md border border-red-600 bg-red-200 py-1 text-red-600 shadow-md transition ${
                    data?.products.length
                      ? "hover:scale-105 active:scale-95"
                      : ""
                  } disabled:border-0 disabled:bg-gray-400 disabled:text-white dark:bg-red-950 dark:disabled:bg-gray-500`}
                  disabled={!data?.products.length}
                  onClick={clearAll}
                >
                  <img
                    src="/images/trash.svg"
                    alt="remove icon"
                    className="mr-1"
                  />
                  Clear All
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Container>
  );
}

export default Cart;
