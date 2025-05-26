import { io } from "socket.io-client";

const SOCKET_URL = "https://chat-room-egah.onrender.com/";
// const SOCKET_URL = "http://localhost:3000/";

export const socket = io(SOCKET_URL, { autoConnect: false });
