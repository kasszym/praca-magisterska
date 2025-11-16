import axios from "axios";
import { errorInterceptor } from "./interceptor";

const API_HEADERS = {
  "X-Requested-With": "XMLHttpRequest",
  "Access-Control-Allow-Origin": "*",
};

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: API_HEADERS,
  timeout: 20000
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

errorInterceptor(API);

export default API;
