import axios from "axios";
import { authAxiosInstance } from "./auth.axios";

export const adminAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PRIVATE_API_URI,
  withCredentials: true,
});

adminAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await authAxiosInstance.post("/refresh-token");

        return adminAxiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token expired. Redirecting to login.");
        sessionStorage.removeItem("userSession");
        window.location.href = "/admin";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const clientAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PRIVATE_API_URI,
  withCredentials: true,
});

clientAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await authAxiosInstance.post("/refresh-token");

        return clientAxiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token expired. Redirecting to login.");
        sessionStorage.removeItem("userSession");
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const vendorAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PRIVATE_API_URI,
  withCredentials: true,
});

vendorAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await authAxiosInstance.post("/refresh-token");

        return vendorAxiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token expired. Redirecting to login.");
        sessionStorage.removeItem("userSession");
        window.location.href = "/vendor";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
