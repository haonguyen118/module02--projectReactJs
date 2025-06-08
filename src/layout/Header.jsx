import React from "react";

export default function Header() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
        width: 1160,
        height: 56,
        left: 240,
      }}
    >
      <i
        style={{ color: "wheat", marginTop: 10, marginRight: 10 }}
        className="fa-solid fa-bell"
      ></i>
      <img
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          marginLeft: 10,
        }}
        src="../public/image.png"
        alt="image"
      />
    </div>
  );
}
