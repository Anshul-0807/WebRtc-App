import { useState } from "react";
import { useStateWithCallback } from "./useStateWithCallback";

export const useWebRTC  = () => {
    const [clients, setClients] = useStateWithCallback([
        {
            id: 1,
            name: 'Anshul',
          },
          {
            id:2,
            name: 'john doe',
          },
    ]);

     return { clients };
};