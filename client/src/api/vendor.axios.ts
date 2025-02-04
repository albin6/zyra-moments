import axios from "axios";
import { authAxiosInstance } from "./auth.axios";

export const vendorAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PRIVATE_API_URI,
  withCredentials: true,
});

let isRefreshing = false;

vendorAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          await authAxiosInstance.post("/refresh-token");
          isRefreshing = false;

          return vendorAxiosInstance(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          console.error("Refresh token expired. Redirecting to login.");
          localStorage.removeItem("vendorSession");
          window.location.href = "/vendor";
          return Promise.reject(refreshError);
        }
      }
    }

    if (
      error.response.status === 403 &&
      error.response.data.message ===
        '"Access denied. You do not have permission to access this resource."' &&
      !originalRequest._retry
    ) {
      localStorage.removeItem("vendorSession");
      window.location.href = "/vendor";
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
