import axios from "axios";

// console.log(window.URL)
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

// const urlParams = new URLSearchParams(window.location.search)
// const routeToken = urlParams.get("token")
// const token = localStorage.getItem("token") || routeToken
// if (token) {
// 	axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
// }
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error.response);
  }
);
export { api };
