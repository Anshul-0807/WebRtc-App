import { useState } from "react";

export const useWebRTC  = () => {
    const [clients, setClients] = useState([
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