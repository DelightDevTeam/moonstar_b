import axios from "axios";
import BASE_URL from "../hooks/baseURL";

// Set the base URL and withCredentials options
axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;

// Add a request interceptor to include the Bearer token
axios.interceptors.request.use(
  (config) => {
    // Retrieve the token from local storage or any other secure place
    const token = localStorage.getItem("token"); // Replace with your token retrieval logic

    // If the token exists, set it in the headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle the request error here
    return Promise.reject(error);
  }
);

export default axios;
