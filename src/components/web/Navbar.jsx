import Container from "../shared/Container";
import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ user, setUser }) {
  const navItems = useRef(null);
  const profileDropdown = useRef(null);
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

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setUser(null);
    navigate("/");
  };

  return (
    <>
      <nav className="navbar fixed w-full border-b border-gray-600 bg-gray-300 bg-opacity-50 py-2 text-black backdrop-blur-md dark:bg-gray-800 dark:bg-opacity-50 dark:text-white">
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
              className="nav-items absolute right-0 top-16 w-auto translate-x-full items-center justify-between rounded-s-2xl border border-r-0 border-gray-600 bg-gray-300 p-3 transition-transform duration-300 ease-in-out dark:border-0 dark:bg-gray-900 md:static md:ml-5 md:flex md:w-full md:translate-x-0 md:border-0 md:bg-transparent md:py-0"
            >
              <ul className="md:flex">
                {user && (
                  <li
                    className={`bndlock roued-md mx-1 px-2 py-1 transition hover:bg-gray-400 dark:hover:bg-gray-600 md:hidden `}
                  >
                    <Link to={"/profile"}>Profile</Link>
                  </li>
                )}
                <li className="transitio mx-1 rounded-md px-2 py-1 hover:bg-gray-400 dark:hover:bg-gray-600">
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
                {user && (
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
                  user ? "hidden" : ""
                } account-buttons mb-1 mt-3 items-center md:my-0`}
              >
                {user ? (
                  <>
                    <button
                      className="hidden items-center rounded-full bg-gray-100 px-2 py-1 transition hover:bg-gray-400 active:bg-gray-500 dark:bg-gray-300 md:flex"
                      onClick={handelDropdownClick}
                    >
                      <img src="/images/user.svg" className="mr-2" alt="" />
                      <img src="/images/angle-down.svg" alt="" />
                    </button>
                    <div
                      ref={profileDropdown}
                      className="absolute top-12 hidden rounded-md border border-gray-600 bg-gray-300 px-3 py-2 opacity-0 transition-all dark:border-0 dark:bg-gray-900"
                    >
                      <ul>
                        <li className="rounded-md px-2 text-black transition hover:bg-gray-400 dark:text-gray-300 dark:hover:bg-gray-600">
                          <Link to={"/profile"}>Profile</Link>
                        </li>
                        <li className="rounded-md px-2 text-black transition hover:bg-gray-400 dark:text-gray-300 dark:hover:bg-gray-600">
                          <button type="button" onClick={handleLogout}>
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  </>
                ) : (
                  <>
                    <button className="mx-3 rounded-full bg-gradient-to-tr from-red-600 to-amber-500 px-4 py-1 text-white hover:from-amber-500 hover:to-red-600">
                      <Link to={"/register"}>Create Account</Link>
                    </button>
                    <button className="mr-3 rounded-full bg-gradient-to-tr from-amber-500 to-orange-600  px-4 py-1 text-white hover:from-orange-600 hover:to-amber-500">
                      <Link to={"/login"}>Login</Link>
                    </button>
                  </>
                )}
              </div>
            </div>
            <button
              className="block rounded-md px-2 transition hover:bg-gray-800 active:bg-gray-950 md:hidden"
              onClick={handleBurgerClick}
            >
              <img src="/images/burger-menu.svg" alt="" />
            </button>
          </div>
        </Container>
      </nav>
    </>
  );
}

export default Navbar;
