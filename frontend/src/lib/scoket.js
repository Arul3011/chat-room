import { io } from "socket.io-client";

const SOCKET_URL = "https://chat-room-egah.onrender.com/";
export const socket = io(SOCKET_URL, { autoConnect: false });
