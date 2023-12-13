import Container from "../shared/Container";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UserContext } from "../../Contexts/UserContext";
import useTheme from "../../hooks/useTheme";
import { CartContext } from "../../Contexts/CartContext";

function Navbar() {
  const { userToken, setUserToken } = useContext(UserContext);
  const { count } = useContext(CartContext);
  const { setTheme } = useTheme();
  const navItems = useRef(null);
  const profileDropdown = useRef(null);
  const themeButtonRef = useRef(null);
  const navigate = useNavigate();

  const handleBurgerClick = () => {
    const element = navItems.current;
    if (element) element.classList.toggle("translate-x-full");
  };

  const handelDropdownClick = () => {
    const element = profileDropdown.current;
    if (element) {
      element.classList.toggle("opacity-0");
      element.classList.toggle("hidden");
    }
  };

  const changeTheme = () => {
    const theme = localStorage.getItem("theme");
    if (theme == "dark") {
      setTheme("light");
      themeButtonRef.current.src = "/images/dark-mode.svg";
    } else {
      setTheme("dark");
      themeButtonRef.current.src = "/images/light-mode.svg";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/");
  };

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme == "dark") themeButtonRef.current.src = "/images/light-mode.svg";
    else themeButtonRef.current.src = "/images/dark-mode.svg";
  }, []);

  return (
    <>
      <nav className="navbar fixed z-50 w-full border-b border-gray-600 bg-gray-300 bg-opacity-50 py-2 text-black backdrop-blur-md dark:bg-gray-900 dark:bg-opacity-50 dark:text-white">
        <Container>
          <div className="text-md flex justify-between">
            <h2
              className="inline-block rounded-md px-2 py-1 text-lg font-bold"
              href="#"
            >
              MoeShop
            </h2>
            <div
              ref={navItems}
              className="nav-items dakr:border absolute right-0 top-16 w-auto translate-x-full items-center justify-between rounded-s-2xl border border-r-0 border-gray-600 bg-gray-100 p-3 transition-transform duration-300 ease-in-out dark:border-gray-600 dark:bg-gray-900 md:static md:ml-3 md:flex md:w-full md:translate-x-0 md:border-0 md:bg-transparent md:py-0 md:dark:bg-transparent"
            >
              <ul className="md:flex">
                {userToken && (
                  <li
                    className={`mx-1 block rounded-md px-2 py-1 transition hover:bg-gray-400 dark:hover:bg-gray-600 md:hidden `}
                  >
                    <Link to={"/profile"}>Profile</Link>
                  </li>
                )}
                <li className="mx-1 rounded-md px-2 py-1 transition hover:bg-gray-400 dark:hover:bg-gray-600">
                  <Link className="" to={"/"}>
                    Home
                  </Link>
                </li>
                <li className="mx-1 rounded-md px-2 py-1 transition hover:bg-gray-400 dark:hover:bg-gray-600 ">
                  <Link className="" to={"/categories"}>
                    Categories
                  </Link>
                </li>
                <li className="mx-1 rounded-md px-2 py-1 transition hover:bg-gray-400 dark:hover:bg-gray-600 ">
                  <Link className="" to={"/products"}>
                    Products
                  </Link>
                </li>
                {userToken && (
                  <li
                    className={`mx-1 rounded-md px-2 py-1 transition hover:bg-gray-400 dark:hover:bg-gray-600`}
                  >
                    <Link to={"/Cart"}>
                      <span className={`relative`}>
                        Cart
                        <span className="absolute -top-2 rounded-md bg-amber-500 px-1 text-sm font-bold text-black dark:bg-orange-500 dark:text-white">
                          {count}
                        </span>
                      </span>
                    </Link>
                  </li>
                )}
                {userToken && (
                  <li className="mx-1 rounded-md px-2 py-1 transition hover:bg-gray-400 dark:hover:bg-gray-600 ">
                    <Link className="" to={"/orders"}>
                      Orders
                    </Link>
                  </li>
                )}
                {userToken && (
                  <li
                    className={`mx-1 block rounded-md px-2 py-1 transition hover:bg-gray-400 dark:hover:bg-gray-600 md:hidden `}
                  >
                    <button type="button" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                )}
              </ul>
              <div
                className={`md:flex ${
                  userToken ? "hidden" : ""
                } account-buttons mb-1 mt-3 items-center md:my-0`}
              >
                {userToken ? (
                  <>
                    <button
                      className="hidden items-center rounded-full border border-gray-500 bg-gray-200 px-2 py-1 transition hover:bg-gray-100 active:scale-95 dark:hover:bg-gray-400 md:flex"
                      onClick={handelDropdownClick}
                    >
                      <img src="/images/user.svg" className="mr-2" alt="" />
                      <img src="/images/angle-down.svg" alt="" />
                    </button>
                    <div
                      ref={profileDropdown}
                      className="absolute top-12 hidden rounded-md border border-gray-600 bg-gray-200 px-3 py-2 opacity-0 transition-all dark:border-0 dark:bg-gray-900"
                    >
                      <ul>
                        <li className="rounded-md pl-2 pr-8 text-black transition hover:bg-gray-400 dark:text-gray-300 dark:hover:bg-gray-600">
                          <Link to={"/profile"}>Profile</Link>
                        </li>
                        <li className="rounded-md pl-2 pr-8 text-black transition hover:bg-gray-400 dark:text-gray-300 dark:hover:bg-gray-600">
                          <button type="button" onClick={handleLogout}>
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  </>
                ) : (
                  <>
                    <Link to={"/register"}>
                      <motion.button
                        initial={{
                          background:
                            "linear-gradient(45deg, rgba(220,38,38,1) 0%, rgba(245,158,11,1) 100%)",
                        }}
                        whileHover={{
                          background:
                            "linear-gradient(45deg, rgba(245,158,11,1) 0%, rgba(220,38,38,1) 100%)",
                          scale: 1.05,
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="mx-3 rounded-full bg-gradient-to-tr px-4 py-1 text-white "
                      >
                        Create Account
                      </motion.button>
                    </Link>
                    <Link to={"/login"}>
                      <motion.button
                        initial={{
                          background:
                            "linear-gradient(45deg, rgba(245,158,11,1) 0%, rgba(234,88,12,1) 100%)",
                        }}
                        whileHover={{
                          background:
                            "linear-gradient(45deg, rgba(234,88,12,1) 0%, rgba(245,158,11,1) 100%)",
                          scale: 1.05,
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="mr-3 rounded-full bg-gradient-to-tr px-4 py-1 text-white "
                      >
                        Login
                      </motion.button>
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <button
                className="theme-toggler rounded-full p-2
              transition hover:bg-gray-100 dark:hover:bg-gray-600"
                onClick={changeTheme}
              >
                <img ref={themeButtonRef} src="/images/dark-mode.svg" alt="" />
              </button>
              <button
                className="block rounded-md px-2 transition hover:bg-gray-800 active:bg-gray-950 md:hidden"
                onClick={handleBurgerClick}
              >
                <img src="/images/burger-menu.svg" alt="" />
              </button>
            </div>
          </div>
        </Container>
      </nav>
    </>
  );
}

export default Navbar;
