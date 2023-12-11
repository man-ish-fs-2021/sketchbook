import { io } from "socket.io-client";
const url =
  process.env.NODE_ENV === "production"
    ? "https://sketchbook-backend-kqox.onrender.com"
    : "http://localhost:5334";
const socket = io(url);
export { socket };
