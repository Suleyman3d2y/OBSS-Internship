import React from "react";
import {Input, Space} from 'antd';
import TableComponent from "./TableComponent";
import EditAuthorModal from "../modal/EditAuthor";
import {SearchOutlined} from "@ant-design/icons";
import BookService from "../../service/BookService";
import AuthorBooks from "../modal/AuthorBooks";
import useRender from "../../util/useRender";

const bookservice = new BookService();

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
                <EditAuthorModal id={String(record.id)} render={useRender}/>
                <AuthorBooks authorName={record.name} />
            </Space>
        ),
    },

];

class UserList extends React.Component {
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

        const data = await bookservice.fetchAuthorData(params);

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
                name = {"Author Table"}
                render={useRender}
            />
        );
    }
}

export default UserList;
