import axios from "axios";

const Instance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  headers: {
    token: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default Instance;
