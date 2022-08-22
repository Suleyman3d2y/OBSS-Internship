import {Button, Form, Input, Modal, Select, Space, Table} from "antd";
import {SearchOutlined} from "@ant-design/icons"
import EditBook from "../modal/EditBook";
import AddFavButton from "../button/AddFavButton";
import AddReadButton from "../button/AddReadButton";
import React, {useEffect, useState} from "react";
import axiosInstance from "../../util/axiosInstance";
import {Option} from "antd/es/mentions";

const genres = ["Art", "Biography", "Business", "Chick Lit", "Children's", "Christian", "Classics",
    "Comics", "Contemporary", "Cookbooks", "Crime", "Ebooks", "Fantasy", "Fiction",
    "Gay and Lesbian", "Graphic Novels", "Historical Fiction", "History", "Horror",
    "Humor and Comedy", "Manga", "Memoir", "Music", "Mystery", "Nonfiction", "Paranormal",
    "Philosophy", "Poetry", "Psychology", "Religion", "Romance", "Science", "Science Fiction",
    "Self Help", "Suspense", "Spirituality", "Sports", "Thriller", "Travel", "Young Adult"]

const genreFilters = genres.map((genre) => {
    return {text: genre, value: genre}
})

const Filter = (genres,value) => {
    let contains = false;
    genres.map((genre) => {
        if(genre.name.indexOf(value) === 0){
            return contains = true;
        }
        return contains;
    })
    return contains;
}

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
                <EditBook id={record.id} name={record.name} genre={record.genre} pageCount={record.pageCount}
                          rating={record.rating} authorId={record.authorId} active={String(record.active)}/>
                <AddFavButton bookId={record.id} />
                <AddReadButton bookId={record.id} />
            </Space>

        ),
    },

];


function PreferForm() {

    const [visible, setVisible] = useState(false);
    const [data,setData] = useState();
    const [showTable,setShowTable] = useState(false);
    const genre = ["Art", "Biography", "Business", "Chick Lit", "Children's", "Christian", "Classics",
        "Comics", "Contemporary", "Cookbooks", "Crime", "Ebooks", "Fantasy", "Fiction",
        "Gay and Lesbian", "Graphic Novels", "Historical Fiction", "History", "Horror",
        "Humor and Comedy", "Manga", "Memoir", "Music", "Mystery", "Nonfiction", "Paranormal",
        "Philosophy", "Poetry", "Psychology", "Religion", "Romance", "Science", "Science Fiction",
        "Self Help", "Suspense", "Spirituality", "Sports", "Thriller", "Travel", "Young Adult"]
    const [genreOptions, setGenreOptions] = useState();

    const getGenreOptions = () => {
        const options = [];
        genre.forEach((genre) => {
            options.push(<Option key={genre}>{genre}</Option>)
        })
        setGenreOptions(options);
    }

    useEffect(() => {
        getGenreOptions()
    }, [])

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
                    />

                </Modal>
            )
        }



    }

    function submit(e) {

        axiosInstance.get(`http://localhost:8080/api/v1/library/books/${e.minRating}/${e.minPageCount}/${e.genre}`, {
            withCredentials:true,
        })
            .then((response) => {
                    setData(response.data);
                    setShowTable(true);
                    setVisible(true);
            })

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
                        id="minRating"
                        label="Min Rating"
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
                        label="Max Page"
                        name="minPageCount"
                        rules={[{
                            required: true,
                            message: 'Please input your minimum Page Number!'
                        }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        id="genre"
                        label="New Genre"
                        name="genre"
                        rules={[{
                            required: true,
                            message: 'Please input a valid genre!',
                        }]}
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

export default PreferForm;

