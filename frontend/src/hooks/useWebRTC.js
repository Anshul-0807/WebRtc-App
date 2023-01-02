import { useState } from "react";
import { useStateWithCallback } from "./useStateWithCallback";

export const useWebRTC  = () => {
    const [clients, setClients] = useStateWithCallback()
     return { clients };
};