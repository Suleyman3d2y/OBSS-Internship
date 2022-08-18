import axios from "axios";


const axiosInstance = axios.create({
    headers: {Authorization: `Bearer ${sessionStorage.getItem("jwt")}`}
})
export default axiosInstance;