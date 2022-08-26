import {Button, Form, Input, Modal, Select, Space, Table} from "antd";
import {SearchOutlined} from "@ant-design/icons"
import AddFavButton from "../button/AddFavButton";
import AddReadButton from "../button/AddReadButton";
import React, {useState} from "react";
import axiosInstance from "../../util/axiosInstance";

import GenreUtil from "../../util/genreUtil";

const SearchBooks = (props) => {

    const {genreOptions,genreFilters,Filter} = GenreUtil();
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
            sorter: (a, b) => a.active - b.active
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">

                    <AddFavButton bookId={record.id} update={props.update} refresh={props.refresh} />

                    <AddReadButton bookId={record.id} update={props.update} refresh={props.refresh} />
                </Space>

            ),
        },

    ];


    const [visible, setVisible] = useState(false);
    const [data,setData] = useState();
    const [showTable,setShowTable] = useState(false);
    const [loading,setLoading] = useState(false)

    const CreateTable = (props) => {
        if(props.show) {
            return(
                <Modal
                    width={1500}
                    title="Preferred Books"
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

    function submit(e) {
        setShowTable(true);
        setVisible(true);
        setLoading(true);

        const requestBody = e;
        console.log(requestBody)


        axiosInstance.post(`http://localhost:8080/api/v1/library/search-books`, requestBody, {
            withCredentials:true,
        })
            .then((response) => {
                    setData(response.data);
                    setLoading(false);
            })
            .catch(() => alert("An error occurred please try again."))



    }

    return (
        <div align="left">
            <Space>
                <Form
                    layout="vertical"
                    title="Log In"
                    name="Login"
                    className="login-form"
                    initialValues={{remember: true}}
                    onFinish={submit}
                    autoComplete="off"

                >
                    <Form.Item
                        id="name"
                        label="Book Name"
                        name="name"
                        rules={[{
                            message: 'Please input a valid number!',
                            pattern: new RegExp('^[a-zA-Züğöçı0-9 ]*$')
                        }]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        id="pageCount"
                        label="Max Page Number"
                        name="pageCount"
                        rules={[{
                            message: 'Please input a valid number!',
                            pattern: new RegExp('^[1-9]+[0-9]*$')
                        }]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        id="rating"
                        label="Min Rating"
                        name="rating"
                        rules={[{
                            message: 'Please input a valid rating!',
                            pattern: new RegExp('^[0-9](\\.[0-9])?$')
                        }]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        id="isbn"
                        label="ISBN-10"
                        name="isbn"
                        rules={[{
                            message: 'Please input a valid ISBN!',
                            pattern: new RegExp('^[0-9]{10}$')

                        }]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        id="authorName"
                        label="Author Name"
                        name="authorName"
                        rules={[{
                            message: 'Please input a valid name!',
                            pattern: new RegExp('^[a-zA-Züğöçı ]*$')

                        }]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        id="genres"
                        label="Genres"
                        name="genres"

                    >
                        <Select
                            showSearch
                            mode="tags"
                            style={{width:'%100'}}
                            placeholder="Select a genre from list."
                            optionFilterProp="children"
                            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                            allowClear
                        >
                            {genreOptions}
                        </Select>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                        <Button type="primary" htmlType="submit" icon={<SearchOutlined/>}>
                            Find
                        </Button>
                    </Form.Item>
                </Form>
                <CreateTable dataSource={data} show={showTable}/>
            </Space>
        </div>
    );
}

export default SearchBooks;

