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
    },[])

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
                        rowKey={(record) => record.id}
                    />

                </Modal>
            )
        }



    }

    function submit(e) {

        let requestBody = {
            name:"",
            pageCount:10000,
            rating:0,
            isbn:"",
            authorName:"",
            genres: genre
        }
        console.log(e)
        requestBody.name = (e.name !== undefined ? requestBody.name = e.name :"")
        requestBody.pageCount = (e.pageCount !== undefined ? requestBody.pageCount = e.pageCount :10000)
        requestBody.rating = (e.rating !== undefined ? requestBody.rating = e.rating :0)
        requestBody.isbn = (e.isbn !== undefined ? requestBody.isbn = e.isbn :"")
        requestBody.authorName = (e.authorName !== undefined ? requestBody.authorName = e.authorName :"")
        requestBody.genres = (e.genres !== undefined ? requestBody.genres = e.genres :genre)

        console.log(requestBody)

        axiosInstance.post(`http://localhost:8080/api/v1/library/search-books`, requestBody, {
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
                        id="name"
                        label="Book Name"
                        name="name"
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        id="pageCount"
                        label="Max Page Number"
                        name="pageCount"
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        id="rating"
                        label="Min Rating"
                        name="rating"
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        id="isbn"
                        label="ISBN"
                        name="isbn"
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        id="authorName"
                        label="Author Name"
                        name="authorName"
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

export default PreferForm;

