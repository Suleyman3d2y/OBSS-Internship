import {useState} from "react";

export default function useData() {

    const getData = () => {
        return {
            jwt: sessionStorage.getItem("jwt"),
            id: sessionStorage.getItem("id"),
            role: sessionStorage.getItem("role")
        }
    }
    const [data,setData] = useState(getData());

    const saveData = (responseData) => {
        sessionStorage.setItem("jwt",responseData.jwt)
        sessionStorage.setItem("id",responseData.id)
        sessionStorage.setItem("role",responseData.role)
        setData(responseData)
    }

    return {
        setData: saveData,
        data
    }

}