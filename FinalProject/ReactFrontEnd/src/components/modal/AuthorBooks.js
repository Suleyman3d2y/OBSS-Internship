import axios from "axios";
import {Button, Form, Input, Modal, Space, Table} from "antd";
import {SearchOutlined} from "@ant-design/icons"
import EditBook from "../modal/EditBook";
import AddFavButton from "../button/AddFavButton";
import AddReadButton from "../button/AddReadButton";
import React, {useState} from "react";

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
            <Space size="middle">
                <EditBook id={record.id} name={record.name} genre={record.genre} pageCount={record.pageCount}
                          rating={record.rating} authorId={record.authorId} active={String(record.active)}/>
                <AddFavButton bookId={record.id}/>
                <AddReadButton bookId={record.id}/>
            </Space>

        ),
    },

];


function AuthorBooks(props) {

    const [visible, setVisible] = useState(false);
    const [data, setData] = useState();

    const CreateTable = (props) => {

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
                />

            </Modal>
        )

    }

    function submit() {

        axios.get(`http://localhost:8080/api/v1/library/author-books/${props.authorName}`, {
            withCredentials: true,
        })
            .then((response) => {
                setData(response.data);

                setVisible(true);
            })

    }

    return (
        <div align="left">
            <Space>
                <Button type="primary" htmlType="submit" icon={<SearchOutlined/>} onClick={submit}>
                    See Books
                </Button>
                <CreateTable dataSource={data}/>
            </Space>
        </div>
    );
}

export default AuthorBooks;

