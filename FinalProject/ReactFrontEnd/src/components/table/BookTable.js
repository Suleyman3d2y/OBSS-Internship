import React from "react";
import {Input, Space} from 'antd';
import BookService from "../../service/BookService";
import EditBook from "../modal/EditBook";
import TableComponent from "./TableComponent";
import AddFavButton from "../button/AddFavButton";
import AddReadButton from "../button/AddReadButton";
import {SearchOutlined} from "@ant-design/icons"



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
        sorter: (a, b) => a.active - b.active
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
                <Space size="middle">
                    <EditBook id={record.id} name={record.name} genre={record.genre} pageCount={record.pageCount}
                              rating={record.rating} authorName={record.author.name} />
                    <AddFavButton bookId={record.id}  />
                    <AddReadButton bookId={record.id} />
                </Space>

        ),
    },

];

class BookTable extends React.Component {
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

        const data = await bookservice.fetchBookData(params);
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
                name = {"Book Table"}
            />
        );
    }
}

export default BookTable;
