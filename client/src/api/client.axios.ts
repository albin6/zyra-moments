import axios from "axios";

export const clientAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_CLIENT_API_URI,
  withCredentials: true,
});
