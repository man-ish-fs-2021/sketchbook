import { io } from "socket.io-client";
const socket = io("http://localhost:5334");
export { socket };
