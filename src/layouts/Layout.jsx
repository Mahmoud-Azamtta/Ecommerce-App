import React from "react";
import Navbar from "../components/web/Navbar";
import Footer from "../components/web/Footer";
import { Outlet } from "react-router-dom";

function Layout({ user, setUser, setTheme }) {
  return (
    <>
      <Navbar user={user} setUser={setUser} setTheme={setTheme} />
      <Outlet />
      <Footer />
    </>
  );
}
export default Layout;
