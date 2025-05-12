import axios from "axios";

const projectaxiosinstance = axios.create({
  baseURL: "http://localhost:5002/api",
  withCredentials: true,     
  headers: { "Content-Type": "application/json" },
});


projectaxiosinstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("inst" , error);
    
    if (error.response.status === 401 || error.response.status === 403) {
      console.error("Unauthorized! Redirecting to login...");
      localStorage.clear(); 
      window.location.href ="/"; 
      alert("Session expired! Please log in again.");

    }
    return Promise.reject(error);
  }
);

export default projectaxiosinstance


