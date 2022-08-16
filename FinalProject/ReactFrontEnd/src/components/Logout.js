import axios from "axios";
import {useNavigate} from "react-router-dom";


function Logout() {

    const url = "http://localhost:8080/api/v1/logout";
    const navigate = useNavigate();
        axios.get(url,{withCredentials: true}
        )
            .then(() => {
                sessionStorage.removeItem("id")
                sessionStorage.removeItem("role")
                sessionStorage.removeItem("jwt")

                navigate("/")

            })
            .catch(() => {

            })



}

export default Logout;

