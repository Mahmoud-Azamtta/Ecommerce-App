import React from "react";
import Navbar from "../components/web/Navbar";
import Footer from "../components/web/Footer";
import { Outlet } from "react-router-dom";

function Layout({user, setUser}) {
  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <div className="dark:bg-gray-800 dark:text-gray-300">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
export default Layout;
