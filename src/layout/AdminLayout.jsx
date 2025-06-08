import React from "react";
import SizeBar from "./SizeBar";
import Header from "./Header";
import ListUsers from "./ListUsers";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div style={{ display: "flex" }}>
      <SizeBar />
      <div style={{ width: 1160, height: "100vh", left: 240 }}>
        <Header />
        <hr />
        <br />
        <Outlet />
      </div>
    </div>
  );
}
