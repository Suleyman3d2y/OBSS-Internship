import {useNavigate} from "react-router-dom";
import axiosInstance from "../util/axiosInstance";


function Logout() {

    const url = "http://localhost:8080/api/v1/logout";
    const navigate = useNavigate();
    axiosInstance.get(url,{
                withCredentials:true,
                headers: {
                    "Authorization":`Bearer ${sessionStorage.getItem("jwt")}`
                }
            }
        )
            .then(() => {
                sessionStorage.removeItem("id")
                sessionStorage.removeItem("role")
                sessionStorage.removeItem("jwt")
                navigate("/")
                window.location.reload();


            })
            .catch(() => {

            })



}

export default Logout;

