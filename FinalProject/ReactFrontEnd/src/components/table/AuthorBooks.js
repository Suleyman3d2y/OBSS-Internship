import {Button, Input, Modal, Space, Table} from "antd";
import {SearchOutlined} from "@ant-design/icons"
import EditBook from "../modal/EditBook";
import AddFavButton from "../button/AddFavButton";
import AddReadButton from "../button/AddReadButton";
import React, {useState} from "react";
import axiosInstance from "../../util/axiosInstance";
import GenreUtil from "../../util/genreUtil";

const AuthorBooks = (props) => {


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
                        onChange={(e) => {
                            setSelectedKeys(e.target.value ? [e.target.value] : [])
                        }}
                        onPressEnter={() => {
                            confirm()
                        }}
                        onBlur={() => {
                            confirm()
                        }}
                    ></Input>)
            },
            filterIcon: () => {
                return <SearchOutlined/>
            },
            onFilter: (value, record) => {
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
                        onChange={(e) => {
                            setSelectedKeys(e.target.value ? [e.target.value] : [])
                        }}
                        onPressEnter={() => {
                            confirm()
                        }}
                        onBlur={() => {
                            confirm()
                        }}
                    ></Input>)
            },
            filterIcon: () => {
                return <SearchOutlined/>
            },
            onFilter: (value, record) => {
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
                <Space direction="vertical" size="small">
                    <EditBook id={record.id} name={record.name} genre={record.genres} pageCount={record.pageCount}
                              rating={record.rating} authorName={record.author.name} update={props.update} refresh = {props.refresh}/>

                    <AddFavButton bookId={record.id} update={props.update}/>

                    <AddReadButton bookId={record.id} update={props.update}/>

                    <a href={`https://www.goodreads.com/book/isbn/${record.isbn}`} target="_blank"
                       rel="noopener noreferrer">See reviews</a>
                    <a href={`https://www.amazon.com/gp/product/${record.isbn}`} target="_blank"
                       rel="noopener noreferrer">Buy on Amazon</a>
                </Space>

            ),
        },

    ];


    const [visible, setVisible] = useState(false)
    const [loading,setLoading] = useState(false)
    const [data, setData] = useState();
    const [showTable,setShowTable] = useState(false)

    const CreateTable = (props) => {
        if(props.show) {
            return (
                <Modal
                    width={1500}
                    title="Author Books"
                    visible={visible}
                    onCancel={() => setVisible(false)}
                    onOk={() => setVisible(false)}
                    footer={[
                        <Button key="back" onClick={() => setVisible(false)}>
                            Cancel
                        </Button>,
                    ]}
                >
                    <Table
                        dataSource={props.dataSource}
                        columns={columns}
                        loading={loading}
                        rowKey={(record) => record.id}

                    />

                </Modal>
            )
        }

    }

    const submit = async () => {
        setShowTable(true);
        setVisible(true);
        setLoading(true);

        axiosInstance.get(`http://localhost:8080/api/v1/library/author-books/${props.authorName}`, {
            withCredentials: true,

        })
            .then((response) => {
                setData(response.data);
                setLoading(false)
            })
            .catch(() => alert("An error occurred please try again."))


    }


    return (
        <div align="left">
            <Space>
                <Button type="primary" htmlType="submit" icon={<SearchOutlined/>} onClick={submit}>
                    See Books
                </Button>
                <CreateTable dataSource={data} show={showTable}/>
            </Space>
        </div>
    );
}

export default AuthorBooks;

