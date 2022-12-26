import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";
import { logout } from "../../../http";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../../store/authSlice";

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
    marginLeft: "10px",
  };

  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.auth);
  async function logoutUser() {
    try {
      const { data } = await logout();
      dispatch(setAuth(data));
    } catch (err) {
      console.log(err);
    }
  } 

  return (
    <nav className={`${styles.navbar} container `}>
      <Link style={brandstyle} to="/">
        <img src="/imags/Emoji.png" alt="logo" />
        <span style={logoText}>coders house</span>
      </Link>

       <div className={styles.navRight}>

          <h3>{user?.name}</h3>

        <Link to="/"> 
          <img
           className={styles.avatar}
          src = {user.avatar}
           width="40"
           height="40"  
           alt="avatar" />
        </Link>
        <button className={styles.logoutButton} onClick={logoutUser}>
          <img src="/imags/logoutimg.png" alt="" />
        </button>
      </div>
      {/* {isAuth && } */}
    </nav>
  );
};
