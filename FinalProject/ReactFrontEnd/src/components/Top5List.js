import {List } from 'antd';
import React from 'react';
import BookService from "../service/BookService";
import axios from "axios";

const bookservice = new BookService();

class Top5List extends React.Component {

    state = {
        id: new URLSearchParams(window.location.search).get("id"),
        role: "",
        data: [],
    };

    componentDidMount() {

        if (this.state.role === "") {
            axios.get(`http://localhost:8080/api/v1/users/${this.state.id}`, {
                withCredentials: true
            })
                .then((response) => {
                    if (response.data.roles.length > 1) {
                        return this.setState({role: "ADMIN"});
                    } else {
                        return this.setState({role: "USER"});
                    }
                })
                .catch((err) => {
                    if(err.response.status === 401){
                        alert(
                            "You are unauthorized. If you are an admin please log in with admin account."
                        )
                        setTimeout(() => {
                            window.location.set("/login")
                        },2000)

                    }
                    else if(err.response.status === 500 && err.response.data.error === "Access is denied") {
                        alert("User TableComponent is only for admins. If you are an admin please log in with admin account.")

                    }
                    else {
                        alert("An error occured.")

                    }
                })
        }

        this.fetch();
    }

    fetch = async () => {

        const bookData = await bookservice.fetchTop5Data();
        this.setState({
            data: bookData
            })

    }

    render() {
        return (
            <>
                <List
                    size="small"
                    header={<div><h2>TOP 5 NEW BOOKS</h2></div>}
                    bordered
                    dataSource={this.state.data.map((item) => {
                        return item;
                    })}
                    renderItem={(item) => (
                        <List.Item>

                                <h1>{item.name}</h1>
                                <h1>RATING :{item.rating}</h1>

                        </List.Item>
                    )}
                />
            </>
        )

    }

}


export default Top5List;