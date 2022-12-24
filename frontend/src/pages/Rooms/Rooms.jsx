import React , {useState} from "react";
import AddRoomModal from "../../component/AddRoomModal/AddRoomModal";
import  RoomCard from "../../component/RoomCard/RoomCard";
import styles from "./Rooms.module.css";




/////////////////////////


const rooms = [
        {
            id:1,
            topic: "Which framework best for frontend ?",
            speakers: [
                {
                    id: 1,
                    name: "jhon Doe",
                    avatar: "/imags/anime2.png",
                },
                {
                    id: 2,
                    name: 'Jane Doe',
                    avatar:  "/imags/anime2.png",
                }
            ],
            totalPeople: 40,
        },
        {
            id:2,
            topic: "Which framework best for backend ?",
            speakers: [
                {
                    id: 1,
                    name: "jhon Doe",
                    avatar: "/Imags/anime2.png",
                },
                {
                    id: 2,
                    name: 'Jane Doe',
                    avatar:  "/imags/anime2.png",
                }
            ],
            totalPeople: 40,
        },
    ]

////////////////////////



export const Rooms = () => {

     const [showModal, setShowModal] = useState(false);
     function openModal(){
       setShowModal(true);
     }
  return (
    <>
      <div className="container">
        <div className={styles.roomsHeader}>
          <div className={styles.left}>
            <span className={styles.heading}>All voice rooms</span>
            <div className={styles.searchBox}>
              <img src="/imags/search.png" alt="searchBox" />
              <input type="text" className={styles.searchInput} />
            </div>
          </div>
          <div className={styles.right}>
            <button onClick={openModal} className={styles.startRoomButton}>
              <img src="/imags/add-room-icon.png" alt="add-room" />
              <span>Start a room</span>
            </button>
          </div>
        </div>

        <div className={styles.roomList}>
          {
            rooms.map((room) => (
              <RoomCard key={room.id} room={room}/>
            ))
          }
        </div>
      </div>
      {showModal && <AddRoomModal onClose={ () => setShowModal(false)}/>}
    </>
  );
};
export default Rooms;
