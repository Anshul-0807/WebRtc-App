import React, { useState } from "react";
import styles from "./AddRoomModal.module.css";
import TextInput from "../shared/TextInput/TextInput";
import {createRoom as create} from '../../http';
import { useHistory } from "react-router-dom";


const AddRoomModal = ({ onClose }) => {

  const history = useHistory();
  const [roomType, setRoomType] = useState("open");
  const [topic, setTopic] = useState('');

  async function createRoom(){
  // server call
  try{
    if(!topic) return;
    const { data } = await create({topic, roomType });
    history.push(`/room/${data.id}`);
    
  }catch(err){
     console.log(err.message);
  }
 }

  return (
    <div className={styles.modalMask}>
      <div className={styles.modalBody}>
        <button onClick={onClose} className={styles.closeButton}>
          <img src="/imags/cancel.png" alt="close" />
        </button>
        <div className={styles.modalHeader}>
          <h3 className={styles.heading}>Enter the topic to be discussed</h3>
          <TextInput
            fullwidth="true"
            value={topic}
            onChange ={(e) => setTopic(e.target.value)}
          />
          <h2 className={styles.subHeading}>Room types</h2>
          <div className={styles.roomTypes}>
            <div
              onClick={() => setRoomType("open")}
              className={`${styles.typeBox} ${
                roomType === "open" ? styles.active : ""
              }`}
            >
              <img src="/imags/Globe.png" alt="Globe" />
              <span>Open</span>
            </div>
            <div
              onClick={() => setRoomType("Social")}
              className={`${styles.typeBox} ${
                roomType === "Social" ? styles.active : ""
              }`}
            >
              <img src="/imags/Users.png" alt="social" />
              <span>Social</span>
            </div>
            <div
              onClick={() => setRoomType("Private")}
              className={`${styles.typeBox} ${
                roomType === "Private" ? styles.active : ""
              }`}
            >
              <img src="/imags/newLock.png" alt="lock" />
              <span>Private</span>
            </div>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <h2>Start a room, open to everyone</h2>
          <button onClick={createRoom} className={styles.footerButton}>
            <img src="/imags/clbrt.png" alt="celebration" />
            <span> Let’s Go </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoomModal;
