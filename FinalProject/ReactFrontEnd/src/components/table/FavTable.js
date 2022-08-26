import React, {useEffect, useState} from "react";
import BookService from "../../service/BookService";
import TableComponent from "./TableComponent";
import {Input, Space} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import RemoveFavButton from "../button/RemoveFavButton";
import GenreUtil from "../../util/genreUtil";


const FavTable = (props) => {


    const {genreFilters,Filter} = GenreUtil();

    const columns = [

        {
            dataIndex: "img",
            render: (_, record) => (
                <img src = {`https://covers.openlibrary.org/b/isbn/${record.isbn}-M.jpg`} alt={record.name} style={{width: 100,height: 150}}/>
            )
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
            dataIndex: "genres",
            render: (genres) => genres.map((genre) => {
                return `${genre.name}\n`
            }),
            filters: genreFilters,
            onFilter: (value, record) => Filter(record.genres,value)

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
                    <RemoveFavButton bookId={record.id} update={props.update} />
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
        const data = await bookService.fetchFavListData(params);
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
            name = {"Favourite Table"}

        />
    );

}
export default FavTable