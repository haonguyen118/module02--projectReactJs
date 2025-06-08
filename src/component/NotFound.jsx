import React from "react";

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 200,
        color: "orange",
        gap: 20,
      }}
    >
      <img
        style={{ backgroundColor: "red", width: 150, height: 150 }}
        src="../public/NotFound.jpg"
        alt=""
      />
      <p style={{ fontSize: 40, fontFamily: "serif" }}> 404 Not Found</p>
    </div>
  );
}
