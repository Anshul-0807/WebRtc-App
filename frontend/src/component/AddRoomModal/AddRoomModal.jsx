import React, { useState } from "react";
import styles from "./AddRoomModal.module.css";
import TextInput from "../shared/TextInput/TextInput";

const AddRoomModal = ({ onClose }) => {
  const [roomType, setRoomType] = useState("open");
  return (
    <div className={styles.modalMask}>
      <div className={styles.modalBody}>
        <button onClick={onClose} className={styles.closeButton}>
          <img src="/imags/cancel.png" alt="close" />
        </button>
        <div className={styles.modalHeader}>
          <h3 className={styles.heading}>Enter the topic to be discussed</h3>
          <TextInput fullwidth="true" />
          <h2 className={styles.subHeading}>Room types</h2>
          <div className={styles.roomTypes}>
            <div
              className={`${styles.typeBox} ${
                roomType === 'open' ? styles.active : ""
              }`}
            >
              <img src="/imags/Globe.png" alt="Globe" />
              <span>Open</span>
            </div>
            <div className={`${styles.typeBox} ${
                roomType === 'Social' ? styles.active : ""
              }`}>
              <img src="/imags/Users.png" alt="social" />
              <span>Social</span>
            </div>
            <div className={`${styles.typeBox} ${
                roomType === 'Private' ? styles.active : ""
              }`}>
              <img src="/imags/newLock.png" alt="lock" />
              <span>Private</span>
            </div>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <h2>Start a room, open to everyone</h2>
          <button className={styles.footerButton}>
            <img src="/imags/clbrt.png" alt="celebration" />
            <span> Let’s Go </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoomModal;
