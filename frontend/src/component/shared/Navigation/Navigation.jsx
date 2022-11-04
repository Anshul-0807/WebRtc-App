import React from "react";
import { Link } from "react-router-dom";
import style from "./Navigation.module.css";

export const Navigation = () => {
  const brandstyle = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "20px",
    display: "flex",
    alignItems: "center",
  };

  const logoText = {
    marginLeft:'10px',

  }

  return (
    <nav className={`${style.navbar} container `}>
      <Link style={brandstyle} to="/">
        <img src="/imags/Emoji.png" alt="logo" />
        <span style={logoText}>coders house</span>
      </Link>
    </nav>
  );
};
