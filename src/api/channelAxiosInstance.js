import axios from "axios";

const channelAxiosInstance = axios.create({
  baseURL: "http://localhost:5004/api/channel",
  withCredentials: true,     
  headers: { "Content-Type": "application/json" },
});


channelAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("channelAxiosInstance" , error);
    
    if (error.response.status === 401 || error.response.status === 403) {
      console.error("Unauthorized! Redirecting to login...");
      localStorage.clear(); 
      window.location.href ="/"; 
      alert("Session expired! Please log in again.");

    }
    return Promise.reject(error);
  }
);

export default channelAxiosInstance