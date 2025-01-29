import axios from "axios";

export const adminAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_ADMIN_API_URI,
  withCredentials: true,
});
