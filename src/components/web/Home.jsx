import React, { useEffect, useRef } from "react";
import Container from "../shared/Container";
import { useQuery } from "react-query";
import { SwiperSlide } from "swiper/react";
import Slider from "../shared/Slider";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Error from "../shared/Error";
import Loader from "../shared/Loader";
function Home() {
  const getCategories = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/categories`,
    );
    return data;
  };

  const { data, isLoading } = useQuery("web_categories", getCategories);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <motion.header initial={{  }} className="item-center flex h-screen flex-col items-center justify-center border-b border-gray-500 bg-home-blob-light bg-cover bg-no-repeat dark:bg-home-blob-dark">
        <div className="content flex">
          <motion.h1
            className="md:text-9xl sm:text-7xl dark:text-white text-6xl font-bold"
            initial={{ x: -500, opacity: 0 }}
            animate={{ x: 0, opacity: 1, }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
          >
            Moe
          </motion.h1>
          <motion.p
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, duration: 0.8, type: "spring", stiffness: 200, damping: 12 }}
            className="md:text-9xl sm:text-7xl text-6xl font-bold dark:text-white"
          >
            Shop
          </motion.p>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 300 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{delay: 1.2, duration: 0.8, type: "spring"}}
          className="md:text-3xl sm:text-2xl text-xl italic dark:text-white"
        >
          Shopping Made Easy
        </motion.p>
      </motion.header>
      <section className="categories-view mb-10">
        <Container>
          <h1 className="py-10 text-4xl font-bold">Categories</h1>
          <hr className="mb-10 dark:bg-gray-700" />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Slider gap={20}>
              {data?.categories.length ? (
                data?.categories.map((category) => (
                  <SwiperSlide key={category._id}>
                    <Link to={`/products/${category._id}`}>
                      <div className="category flex flex-col items-center rounded-xl border border-gray-700 bg-gray-300 p-5 shadow-xl dark:bg-gray-900">
                        <div className="image-wrapper">
                          <img
                            src={category.image.secure_url}
                            alt="category"
                          />
                        </div>
                        <h2 className="text-center text-md font-bold capitalize">
                          {category.name}
                        </h2>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))
              ) : (
                <Error message={"Unable to load categories"} />
              )}
            </Slider>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}

export default Home;
