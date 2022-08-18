import React from "react";
import {Routes,Route} from "react-router-dom";
import LoginForm from "./components/form/LoginForm";
import BookTable from "./components/table/BookTable";
import Home from "./components/Home";
import Logout from "./components/Logout"
import UserTable from "./components/table/UserTable";
import FavTable from "./components/table/FavTable";
import ReadTable from "./components/table/ReadTable";
import AuthorList from "./components/table/AuthorTable";


    function App() {

        return (
            <Routes>
                <Route path="/" element={<LoginForm />}/>
                <Route path="/book-list" element={<BookTable />}/>
                <Route path="/user-list" element={<UserTable />}/>
                <Route path="/author-list" element={<AuthorList />}/>
                <Route path="/fav-list" element={<FavTable />}/>
                <Route path="/read-list" element={<ReadTable />}/>
                <Route path="/home" element={<Home />}/>
                <Route path="/logout" element={<Logout />}/>
            </Routes>
        )
    }

export default App;
