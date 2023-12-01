import React, { useEffect, useRef } from "react";
import Container from "../shared/Container";
import { useQuery } from "react-query";
import { SwiperSlide } from "swiper/react";
import Slider from "../shared/Slider";
import axios from "axios";
import { Link } from "react-router-dom";
import { circInOut, motion, spring } from "framer-motion";
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
            className="text-9xl font-bold"
            initial={{ x: -800, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1, }}
            viewport={{once: true}}
            transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
          >
            Moe
          </motion.h1>
          <motion.p
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{once: true}}
            transition={{ delay: 0.8, duration: 0.8, type: "spring", stiffness: 200, damping: 12 }}
            className="text-9xl font-bold"
          >
            Shop
          </motion.p>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 300 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{once: true}}
          transition={{delay: 1.2, duration: 0.8, type: "spring"}}
          className="text-3xl italic"
        >
          Shopping Made Easy
        </motion.p>
      </motion.header>
      <section className="categories-view">
        <Container>
          <h1 className="py-10 text-4xl font-bold">Categories</h1>
          <hr className="mb-10" />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Slider slides={5} gap={30}>
              {data?.categories.length ? (
                data?.categories.map((category) => (
                  <SwiperSlide key={category._id}>
                    <Link to={`/products/${category._id}`}>
                      <div className="category flex flex-col items-center rounded-xl border border-gray-600 bg-gray-300 p-5 shadow-lg dark:bg-gray-900">
                        <div className="image-wrapper h-64">
                          <img
                            src={category.image.secure_url}
                            alt="category"
                            className="rounded-full"
                          />
                        </div>
                        <h2 className="text-center text-lg font-bold">
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
