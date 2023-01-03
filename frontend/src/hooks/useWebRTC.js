import { useState, useRef } from "react";
import { useStateWithCallback } from "./useStateWithCallback";

const users = [
    {
        id: 1,
        name: 'Anshul',
      },
      {
        id:2,
        name: 'john doe',
      },
]

export const useWebRTC  = (roomId, user) => {
    const [clients, setClients] = useStateWithCallback(users);
    const audioElements = useRef({});
    const connections = useRef({});
    const localMediaStream = useRef(null); 


    const provideRef = (instance, userId) => {
        audioElements.current[userId] = instance;
    }

    const addNewClients = 

    //   capture media

     useEffect(() => {
       const startCapture = async () => {
        localMediaStream.current = await navigator.mediaDevices.getUserMedia({
            audio: true,
        });
       };

       startCapture().then(() => {

       })
     }, [])
     

     return { clients, provideRef };
};