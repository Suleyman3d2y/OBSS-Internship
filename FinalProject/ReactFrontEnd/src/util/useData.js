import {useState} from "react";

export default function useData() {

    const getData = () => {
        return {
            jwt: sessionStorage.getItem("jwt"),
            id: sessionStorage.getItem("id"),
            role: sessionStorage.getItem("role"),
            username: sessionStorage.getItem("username"),
            createDate: sessionStorage.getItem("createDate")
        }
    }
    const [data, setData] = useState(getData());

    const saveData = (responseData) => {
        sessionStorage.setItem("jwt", responseData.jwt)
        sessionStorage.setItem("id", responseData.id)
        sessionStorage.setItem("role", responseData.role)
        sessionStorage.setItem("username", responseData.username)
        sessionStorage.setItem("createDate", responseData.createDate)
        setData(responseData)
    }

    return {
        setData: saveData,
        data
    }

}