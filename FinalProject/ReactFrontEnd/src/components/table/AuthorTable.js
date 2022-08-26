import React, {useEffect, useState} from "react";
import BookService from "../../service/BookService";
import TableComponent from "./TableComponent";
import {Input, Space} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import EditAuthorModal from "../modal/EditAuthor";
import AuthorBooks from "./AuthorBooks";


const AuthorTable = (props) => {


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
                    <EditAuthorModal id={String(record.id)} update={props.update} />
                    <AuthorBooks authorName={record.name} update={props.update} refresh={props.refresh} />
                </Space>
            ),
        },

    ];

    const bookService = new BookService()

    const [data,setData] = useState([])
    const [pagination,setPagination] = useState({
        current: 1,
        pageSize: 10
    })
    const [loading,setLoading] = useState(false);

    const fetch = async (params = {}) => {

        setLoading(true);
        const data = await bookService.fetchAuthorData(params);
        setLoading(false);
        setData(data.content);
        setPagination({
            ...params.pagination,
            total: pagination.pageSize * data.totalPages
        })

    }

    useEffect(() => {
        fetch({
            pagination:pagination
        })
    },[props.refresh])

    const handleTableChange = async (newPagination) => {
        await fetch({
            pagination: newPagination
        })
    }


    return (
        <TableComponent
            columns = {columns}
            dataSource = {data}
            pagination = {pagination}
            loading = {loading}
            handleTableChange = {handleTableChange}
            name = {"Author Table"}
            update={props.update}

        />
    );


}
export default AuthorTable