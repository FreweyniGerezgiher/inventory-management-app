import axios from "axios";

// Get API base URL from environment variables or use default
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.error("Unauthorized access");
    } else if (error.response?.status === 500) {
      // Handle server errors
      console.error("Server error:", error.response.data);
    } else if (!error.response) {
      // Handle network errors
      console.error("Network error - unable to reach server");
    }
    return Promise.reject(error);
  }
);

export default api;