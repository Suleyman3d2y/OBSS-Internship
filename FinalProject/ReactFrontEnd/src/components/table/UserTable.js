import React, {useEffect, useState} from "react";
import TableComponent from "./TableComponent";
import {Input} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import UserService from "../../service/UserService";


const UserTable = (props) => {

    const columns = [

        {
            title: "Id",
            dataIndex: "id",
        },
        {
            title: "Username",
            dataIndex: "username",
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

                return String(record.username).toLowerCase().includes(String(value).toLowerCase())
            }
        },
        {
            title: "Active",
            dataIndex: "active",
            render: (record) => String(record),
            sorter: (a,b) => a.active - b.active
        },
        /*{
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <EditUser id = {record.id} active={String(record.active)} render={useRender}/>
                </Space>
            ),
        },*/

    ];

    const [data,setData] = useState([])
    const [pagination,setPagination] = useState({
        current: 1,
        pageSize: 10
    })
    const [loading,setLoading] = useState(false);

    const fetch = async (params = {}) => {

        setLoading(true);
        const data = await UserService.fetchData(params);
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
            name = {"User Table"}
            update={props.update}

        />
    );

}
export default UserTable