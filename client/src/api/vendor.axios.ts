import axios from "axios";

export const vendorAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_VENDOR_API_URI,
  withCredentials: true,
});
