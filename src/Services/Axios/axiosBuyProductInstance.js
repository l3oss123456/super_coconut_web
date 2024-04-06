import axios from "axios";
import helper from "../Utils/helper";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_ENPOINT_BUY_PRODUCT,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
});

const getToken = () => {
  // return localStorage.getItem("token"); //ตัวอย่างเท่านั้น
  return helper.getCookie("access_token");
  // return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMDEiLCJhZG1pbl9pZCI6NiwiaWF0IjoxNjkxNDY5NTYwLCJleHAiOjE3MjMwMDU1NjB9.Qo0O3I8lGRA3I7dh7iCEwHHU8oMFKe760655ueE65u4";
};

instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
