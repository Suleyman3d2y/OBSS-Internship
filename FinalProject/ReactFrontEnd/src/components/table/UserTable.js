import React from "react";
import {Input, Space} from 'antd';
import axios from "axios";
import EditUser from "../modal/EditUser";
import UserService from "../../service/UserService";
import TableComponent from "./TableComponent";
import {SearchOutlined} from "@ant-design/icons";


const columns = [

    {
        title: "Id",
        dataIndex: "id",
    },
    {
        title: "Username",
        dataIndex: "username",
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm}) => {
            console.log(selectedKeys)
            console.log(selectedKeys)
            return (
                <Input
                    autoFocus
                    value={selectedKeys[0]}
                    onChange={(e) =>{
                        setSelectedKeys(e.target.value?[e.target.value]:[])
                    }}
                    onPressEnter={() => {
                        confirm()
                    }}
                    onBlur={() => {
                        confirm()
                    }}
                ></Input>)
        },
        filterIcon:() => {
            return<SearchOutlined />
        },
        onFilter:(value,record) => {
            console.log(value)
            console.log(record)
            return String(record.username).toLowerCase().includes(String(value).toLowerCase())
        }
    },
    {
        title: "Password",
        dataIndex: "password",
    },
    {
        title: "Active",
        dataIndex: "active",
        render: (record) => String(record),
        sorter: (a,b) => a.active - b.active
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <EditUser id = {record.id} active={String(record.active)}/>
            </Space>
        ),
    },

];

class UserTable extends React.Component {
    state = {
        id: new URLSearchParams(window.location.search).get("id"),
        role: "",
        data: [],
        pagination: {
            current: 1,
            pageSize: 10
        },
        loading: false
    };

    componentDidMount() {

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


        const {pagination} = this.state;
        this.fetch({pagination}, []);
    }

    handleTableChange = (newPagination) => {
        this.fetch({
            pagination: newPagination
        });
    };
    fetch = async (params = {}) => {
        this.setState({loading: true});

        const data = await UserService.fetchData(params);

        this.setState({
            loading: false,
            data: data && data.content,
            pagination: {
                ...params.pagination,
                total: this.state.pagination.pageSize * data.totalPages
            }
        });
    };

    render() {
        const {data, pagination, loading, role, id} = this.state;

        return (
            <TableComponent
                role ={role}
                columns = {columns}
                dataSource = {data}
                pagination = {pagination}
                loading = {loading}
                id = {id}
                handleTableChange = {this.handleTableChange}
                name = {"User Table"}
            />
        );
    }
}

export default UserTable;
