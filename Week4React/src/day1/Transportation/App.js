import React from "react";
import {Routes,Route} from "react-router-dom";
import {Table} from "./Table";
import {Header} from "./Header";
import {BuyNow} from "./BuyNow";

export default function App() {

    return (
        <Routes>
            <Route path="/Transportation" element={<Home/>} />
            <Route path="/BuyNow" element={<BuyNow/>} />
        </Routes>

    )

}

function Home() {
    return (
        <div>
            <Header/>
            <Table/>
        </div>
    )
}



