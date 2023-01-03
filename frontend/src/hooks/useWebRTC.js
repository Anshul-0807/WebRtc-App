import { useState } from "react";
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

export const useWebRTC  = () => {
    const [clients, setClients] = useStateWithCallback(users);

     return { clients };
};