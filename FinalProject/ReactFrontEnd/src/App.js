import React from "react";
import {Route, Routes} from "react-router-dom";
import LoginForm from "./components/form/LoginForm";
import BookTable from "./components/table/BookTable";
import Home from "./components/Home";
import Logout from "./components/Logout"
import UserTable from "./components/table/UserTable";
import FavTable from "./components/table/FavTable";
import ReadTable from "./components/table/ReadTable";
import AuthorList from "./components/table/AuthorTable";
import axiosInstance from "./util/axiosInstance";
import useData from "./util/useData";
import useRender from "./util/useRender";

function App() {

    const {data,setData} = useData();


        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem("jwt")}`
        if(data.jwt === null) {
        return <LoginForm setData={setData}/>
    }

        return (
            <div>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/login" element={<LoginForm setData={setData}/>}/>
                <Route path="/book-list" element={<BookTable render={useRender} />}/>
                <Route path="/user-list" element={<UserTable render={useRender} />}/>
                <Route path="/author-list" element={<AuthorList render={useRender} />}/>
                <Route path="/fav-list" element={<FavTable />}/>
                <Route path="/read-list" element={<ReadTable />}/>
                <Route path="/logout" element={<Logout />}/>
            </Routes>
            </div>
        )
    }

export default App;
