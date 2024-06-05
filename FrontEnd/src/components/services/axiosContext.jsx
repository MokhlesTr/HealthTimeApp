import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:3001", // Autoriser votre domaine frontend
  },
});
export default instance;
