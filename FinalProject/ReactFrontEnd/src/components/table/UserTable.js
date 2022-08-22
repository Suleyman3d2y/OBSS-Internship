import React from "react";
import {Input, Space} from 'antd';
import EditUser from "../modal/EditUser";
import UserService from "../../service/UserService";
import TableComponent from "./TableComponent";
import {SearchOutlined} from "@ant-design/icons";
import useRender from "../../util/useRender";

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
                <EditUser id = {record.id} active={String(record.active)} render={useRender}/>
            </Space>
        ),
    },

];

class UserTable extends React.Component {
    state = {
        data: [],
        pagination: {
            current: 1,
            pageSize: 10
        },
        loading: false
    };

    componentDidMount() {

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
        const {data, pagination, loading} = this.state;

        return (
            <TableComponent
                columns = {columns}
                dataSource = {data}
                pagination = {pagination}
                loading = {loading}
                handleTableChange = {this.handleTableChange}
                name = {"User Table"}
                render={useRender}
            />
        );
    }
}

export default UserTable;
