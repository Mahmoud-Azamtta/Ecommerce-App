import React, { useContext, useEffect, useState } from "react";
import Container from "../shared/Container";
import { motion, useAnimationControls } from "framer-motion";
import { useQuery } from "react-query";
import axios from "axios";
import { UserContext } from "../../Contexts/UserContext";
import Loader from "../shared/Loader";
import Error from "../shared/Error";
import Dropdown from "../shared/Dropdown";
import { data } from "autoprefixer";

function GetOrders() {
  const { userToken } = useContext(UserContext);
  const getOrders = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/order`, {
      headers: { Authorization: `Tariq__${userToken}` },
    });
    return data.orders;
  };

  const { data: orders, isLoading } = useQuery("orders", getOrders);

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
        <h1 className="border-gray- mb-3 border-b pb-5 pt-20 text-4xl font-bold dark:border-gray-700">
          Your Orders
        </h1>
        <div className="min-h-screen">
          {orders ? (
            orders.length ? (
              orders.map((order, index) => (
                <div
                  key={index}
                  className="product my-5 rounded-xl border border-gray-300 bg-gray-200 px-5 py-5 shadow-lg dark:border-gray-700  dark:bg-gray-900 sm:px-10 md:px-20"
                >
                  <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold">Order</h2>
                    <span
                      className={`rounded-full px-3 capitalize text-white
                      ${
                        order.status === "pending"
                          ? "bg-amber-400"
                          : "bg-green-400"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="text-md mt-3 grid  auto-cols-auto grid-cols-2 gap-5 sm:text-lg md:grid-cols-3 xl:grid-cols-5">
                    <div className="flex flex-col">
                      <h3 className="font-bold underline underline-offset-4">
                        Price
                      </h3>
                      <p className="mt-2">{order.finalPrice}$</p>
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-bold underline underline-offset-4">
                        Address
                      </h3>
                      <p className="mt-2">{order.address}</p>
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-bold underline underline-offset-4">
                        Phone Number
                      </h3>
                      <p className="mt-2">{order.phoneNumber}</p>
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-bold underline underline-offset-4">
                        Coupon
                      </h3>
                      <p className="mt-2">
                        {order.couponName ? order.couponName : "No coupon"}
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-bold underline underline-offset-4">
                        Payment Type
                      </h3>
                      <p className="mt-2 capitalize">{order.paymentType}</p>
                    </div>
                  </div>
                  <Dropdown title="Products" buttonFontSize="text-lg">
                    <div
                      className="lg:text-base mt-3 grid grid-cols-4 text-xs md:text-sm
                    "
                    >
                      <h3 className="text-center font-bold underline underline-offset-4">
                        Product ID
                      </h3>
                      <h3 className="text-center font-bold underline underline-offset-4">
                        Quantity
                      </h3>
                      <h3 className="text-center font-bold underline underline-offset-4">
                        Unit Price
                      </h3>
                      <h3 className="text-center font-bold underline underline-offset-4">
                        Final Price
                      </h3>
                    </div>
                    {order.products.map((product, index) => (
                      <div
                        key={index}
                        className="lg:text-base mt-3 grid grid-cols-4 text-xs md:text-sm"
                      >
                        <p className="break-words text-center">{product.productId}</p>
                        <p className="text-center">{product.quantity}</p>
                        <p className="text-center">{product.unitPrice}</p>
                        <p className="text-center">{product.finalPrice}</p>
                      </div>
                    ))}
                  </Dropdown>
                </div>
              ))
            ) : (
              <div className="flex h-1/2 w-full items-center justify-center">
                <p className="text-lg font-bold">
                  You don't have any orders...
                </p>
              </div>
            )
          ) : (
            <Error message={"Unknown error, could not load orders"} />
          )}
        </div>
      </motion.div>
    </Container>
  );
}

export default GetOrders;
