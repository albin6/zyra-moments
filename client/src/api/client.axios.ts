import axios from "axios";
import { authAxiosInstance } from "./auth.axios";

export const clientAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PRIVATE_API_URI,
  withCredentials: true,
});

let isRefreshing = false;

clientAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          await authAxiosInstance.post("/client/refresh-token");
          isRefreshing = false;

          return clientAxiosInstance(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          console.error("Refresh token expired. Redirecting to login.");
          localStorage.removeItem("clientSession");
          window.location.href = "/";
          return Promise.reject(refreshError);
        }
      }
    }

    if (
      (error.response.status === 403 &&
        error.response.data.message ===
          "Access denied. You do not have permission to access this resource.") ||
      (error.response.status === 403 &&
        error.response.data.message === "Token is blacklisted" &&
        !originalRequest._retry)
    ) {
      localStorage.removeItem("clientSession");
      window.location.href = "/";
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
