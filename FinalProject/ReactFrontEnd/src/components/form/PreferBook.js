import axios from "axios";
import {Button, Form, Input, Modal, Space, Table} from "antd";
import {SearchOutlined} from "@ant-design/icons"
import EditBook from "../modal/EditBook";
import AddFavButton from "../button/AddFavButton";
import AddReadButton from "../button/AddReadButton";
import React, {useState} from "react";

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
        sorter: (a, b) => a.active - b.active
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <EditBook id={record.id} name={record.name} genre={record.genre} pageCount={record.pageCount}
                          rating={record.rating} authorId={record.authorId} active={String(record.active)}/>
                <AddFavButton userId={paramId} bookId={record.id} />
                <AddReadButton userId={paramId} bookId={record.id} />
            </Space>

        ),
    },

];


function PreferForm() {

    const [visible, setVisible] = useState(false);
    const [data,setData] = useState();

    const CreateTable = (props) => {

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
                />

            </Modal>
        )

    }

    function submit(e) {

        axios.get(`http://localhost:8080/api/v1/library/books/${e.minRating}/${e.minPageCount}/${e.genres}`, {withCredentials: true})
            .then((response) => {
                    setData(response.data);

                    setVisible(true);
            })

    }

    return (
        <div align="left">
            <Space>
                <Form
                    layout="inline"
                    title="Log In"
                    name="Login"
                    className="login-form"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    initialValues={{remember: true}}
                    onFinish={submit}
                    autoComplete="off"

                >
                    <Form.Item
                        id="minRating"
                        label="MinRating"
                        name="minRating"
                        rules={[{
                            required: true,
                            message: 'Please input your minimum Rating!'
                        }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        id="minPageCount"
                        label="MinPage"
                        name="minPageCount"
                        rules={[{
                            required: true,
                            message: 'Please input your minimum Page Number!'
                        }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        id="genres"
                        label="Genres"
                        name="genres"
                        rules={[{
                            required: true,
                            message: 'Please input your preferred Genres!'
                        }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                        <Button type="primary" htmlType="submit" icon={<SearchOutlined/>}>
                            Find
                        </Button>
                    </Form.Item>
                </Form>
                <CreateTable dataSource={data}/>
            </Space>
        </div>
    );
}

export default PreferForm;

