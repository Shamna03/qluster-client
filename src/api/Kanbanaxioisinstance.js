import axios from "axios";

const Kanbanaxiosinstance = axios.create({
  baseURL: "http://localhost:5003/api",
  withCredentials: true,     
  headers: { "Content-Type": "application/json" },
});


Kanbanaxiosinstance.interceptors.response.use(
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

export default Kanbanaxiosinstance


