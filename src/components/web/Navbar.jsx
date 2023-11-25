import Container from "../shared/Container";
import React, { useRef } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const navItems = useRef(null);

  const handleBurgerClick = () => {
    const element = navItems.current;
    if (element) element.classList.toggle("translate-x-full");
  };

  return (
    <React.Fragment>
      <nav className="navbar fixed w-full bg-gray-900 py-2 text-white">
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
              className="nav-items absolute right-0 top-16 w-auto translate-x-full items-center justify-between rounded-s-2xl bg-gray-900 p-3 transition-transform duration-300 ease-in-out md:static md:ml-5 md:flex md:w-full md:translate-x-0 md:py-0"
            >
              <ul className="md:flex">
                <li className="mx-1 rounded-md px-2 py-1 transition hover:bg-gray-600 ">
                  <a className="" href="#">
                    Home
                  </a>
                </li>
                <li className="mx-1 rounded-md px-2 py-1 transition hover:bg-gray-600 ">
                  <a className="" href="#">
                    Categories
                  </a>
                </li>
                <li className="mx-1 rounded-md px-2 py-1 transition hover:bg-gray-600 ">
                  <a className="" href="#">
                    Products
                  </a>
                </li>
              </ul>
              <div className="account-buttons mb-1 mt-3 flex items-center md:my-0">
                <button className="mx-3 rounded-full bg-gradient-to-tr from-red-600 to-amber-500 px-4 py-1 hover:from-amber-500 hover:to-red-600">
                  <Link to={"/register"}>Create Account</Link>
                </button>
                <button className="mr-3 rounded-full bg-gradient-to-tr from-amber-500  to-orange-600 px-4 py-1 hover:from-orange-600 hover:to-amber-500">
                  <Link to={"/login"}>Login</Link>
                </button>
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
      <div className="pt-14"></div>
    </React.Fragment>
  );
}

export default Navbar;
