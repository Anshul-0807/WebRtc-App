import React from "react";
import styles from "./Button.module.css";
export const Button = ({ text, onClick }) => {
  return (
    <div>
      <button onClick={onClick} className={styles.Button}>
        <span>{text}</span>
        <img className={styles.arrow} src="/imags/Arrow forward.png" alt="" />
      </button>
    </div>
  );
};
export default Button;
