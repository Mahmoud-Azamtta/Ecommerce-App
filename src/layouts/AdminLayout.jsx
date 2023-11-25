import React from "react";
import Navbar from "../components/admin/Navbar";
import Footer from "../components/admin/Footer";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default AdminLayout;
