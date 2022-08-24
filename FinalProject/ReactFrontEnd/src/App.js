import React, {useCallback, useState} from "react";
import {Route,Routes} from "react-router-dom";
import LoginForm from "./components/form/LoginForm";
import BookTable from "./components/table/BookTable";
import Home from "./components/page/Home";
import Logout from "./components/Logout"
import UserTable from "./components/table/UserTable";
import FavTable from "./components/table/FavTable";
import ReadTable from "./components/table/ReadTable";
import AuthorList from "./components/table/AuthorTable";
import axiosInstance from "./util/axiosInstance";
import useData from "./util/useData";
import ResetPassword from "./components/page/ResetPassword";
import LoginScreen from "./components/page/LoginScreen";


function App() {

    const {data,setData} = useData();
    const [refresh,updateState] = useState();
    const update = useCallback(() => updateState({}),[])

        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem("jwt")}`
        if(data.jwt === null) {
        return (
            <Routes>
                <Route path="/reset-password" element={<ResetPassword />}/>
                <Route path="/" element={<LoginScreen setData={setData} />}/>
            </Routes>
        )
    }
        return (
            <div>
            <Routes>
                <Route path="/" element={<Home update={update} refresh={refresh} />}/>
                <Route path="/login" element={<LoginForm setData={setData}/>}/>
                <Route path="/book-list" element={<BookTable update={update} refresh={refresh} />}/>
                <Route path="/user-list" element={<UserTable update={update} refresh={refresh} />}/>
                <Route path="/author-list" element={<AuthorList update={update} refresh={refresh} />}/>
                <Route path="/fav-list" element={<FavTable update={update} refresh={refresh} />}/>
                <Route path="/read-list" element={<ReadTable update={update} refresh={refresh} />}/>
                <Route path="/logout" element={<Logout />}/>
            </Routes>
            </div>
        )
    }

export default App;
