import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const socket = io(SOCKET_URL, {
  transports: ["polling", "websocket"],
});

export default socket;