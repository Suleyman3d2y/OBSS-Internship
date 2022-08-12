import React from "react";
import axios from "axios";
import TableComponent from "./TableComponent";
import {SearchOutlined} from "@ant-design/icons";
import {Input, Space} from "antd";
import RemoveReadButton from "../button/RemoveReadButton";
import BookService from "../../service/BookService";

const bookservice = new BookService();
const paramId = new URLSearchParams(window.location.search).get("id");
const columns = [

    {
        title: "Id",
        dataIndex: "id",
    },
    {
        title: "Name",
        dataIndex: "name",
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm}) => {
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
            return record.name.toLowerCase().includes(value.toLowerCase())
        }
    },
    {
        title: "Genre",
        dataIndex: "genre",
        filters: [
            {text: "Action", value: "Action"},
            {text: "Classic", value: "Classic"},
            {text: "Crime", value: "Crime"},
            {text: "Drama", value: "Drama"},
            {text: "Fantasy", value: "Fantasy"},
            {text: "Romance", value: "Romance"}
        ],
        onFilter: (value, record) => record.genre.indexOf(value) === 0,
    },
    {
        title: "Page Count",
        dataIndex: "pageCount",
        sorter: (a, b) => a.pageCount - b.pageCount
    },
    {
        title: "Rating",
        dataIndex: "rating",
        sorter: (a, b) => a.rating - b.rating
    },
    {
        title: "ISBN",
        dataIndex: "isbn"
    },

    {
        title: "Author",
        dataIndex: "author",
        render: (author) => `${author.name}`,
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm}) => {
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
            return record.name.toLowerCase().includes(value.toLowerCase())
        }
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
                <RemoveReadButton userId={paramId} bookId={record.id} />
            </Space>
        ),
    },

];

class ReadTable extends React.Component {
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
                            "You are unauthorized. If you are an admin or user please log in."
                        )
                        setTimeout(() => {
                            window.location.set("/login")
                        },2000)
                    }
                    else {
                        alert("An error ocurred.")

                    }
                })


        const {pagination} = this.state;
        const {id} = this.state
        this.fetch({pagination,id}, []);
    }

    handleTableChange = (newPagination) => {
        this.fetch({
            id:this.state.id,
            pagination: newPagination
        });
    };
    fetch = async (params = {}) => {
        this.setState({loading: true});
        const data = await bookservice.fetchReadListData(params);
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
        const {data, pagination, loading,role,id} = this.state;

        return (
            <TableComponent
                role ={role}
                columns = {columns}
                dataSource = {data}
                pagination = {pagination}
                loading = {loading}
                id = {id}
                handleTableChange = {this.handleTableChange}
                name = {"Read Table"}
            />
        );
    }
}

export default ReadTable;


/*

 */