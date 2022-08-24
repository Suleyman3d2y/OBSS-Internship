import {Button, Form, Input, Modal, Select} from 'antd';
import React, {useEffect, useState} from 'react';
import axiosInstance from "../../util/axiosInstance";
import {Option} from "antd/es/mentions";
import BookService from "../../service/BookService";

const AddBook = (props) => {

    const url = "http://localhost:8080/api/v1/library/book/add"

    let data = {
        name: "",
        genre: "",
        pageCount: "",
        rating: "",
        isbn: "",
    }
    const [visible, setVisible] = useState(false);
    const [submitText, setSubmitText] = useState("");
    const [loading, setLoading] = useState(false);
    const [authorOptions, setAuthorOptions] = useState([]);
    const genre = ["Art", "Biography", "Business", "Chick Lit", "Children's", "Christian", "Classics",
        "Comics", "Contemporary", "Cookbooks", "Crime", "Ebooks", "Fantasy", "Fiction",
        "Gay and Lesbian", "Graphic Novels", "Historical Fiction", "History", "Horror",
        "Humor and Comedy", "Manga", "Memoir", "Music", "Mystery", "Nonfiction", "Paranormal",
        "Philosophy", "Poetry", "Psychology", "Religion", "Romance", "Science", "Science Fiction",
        "Self Help", "Suspense", "Spirituality", "Sports", "Thriller", "Travel", "Young Adult"]
    const [genreOptions, setGenreOptions] = useState([]);
    const bookService = new BookService();

    const getGenreOptions = () => {
        const options = [];
        genre.forEach((genre) => {
            options.push(<Option key={genre}>{genre}</Option>)
        })
        setGenreOptions(options);
    }

    const getAllAuthorData = async () => {
        const authorData = await bookService.fetchAllAuthorData()
        const options = [];
        authorData.forEach((author) => {
            options.push(<Option key={author.name}>{author.name}</Option>)
        })
        setAuthorOptions(options);

    }

    useEffect(() => {
        getAllAuthorData()
        getGenreOptions()
    },[])

    const showModal = () => {
        if (sessionStorage.getItem("role") === "ADMIN") {
            setVisible(true);
        } else {
            alert("Book adding is only for admins")
        }
    };

    function submit(e) {
        data.name = e.name;
        data.genre = e.genre;
        data.pageCount = e.pageCount;
        data.rating = e.rating;
        data.isbn = e.isbn;
        data.authorName = e.authorName;


        axiosInstance.post(url, data, {
                withCredentials: true,
            }
        )
            .then(() => {
                setSubmitText("Book added successfully")

                setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                    setVisible(false);
                }, 1000)
                props.update()
            })

            .catch((err) => {

                if (err.response.status === 401) {
                    setSubmitText(
                        "You are unauthorized. If you are an admin please log in with admin account."
                    )

                } else if (err.response.status === 500 && err.response.data.error === "Access is denied") {
                    setSubmitText("Book adding is only for admins. If you are an admin please log in with admin account.")

                } else {
                    setSubmitText("Book can not be added right now please try again.")

                }
            })
    }


    return (
        <>
            <Button type="text" onClick={showModal}>
                Add Book
            </Button>
            <Modal
                title="Add Book"
                visible={visible}
                loading={loading}
                onCancel={() => setVisible(false)}
                onOk={() => setVisible(false)}
                footer={[
                    <Button key="back" onClick={() => setVisible(false)}>
                        Cancel
                    </Button>,
                ]}
            >
                <Form
                    name="Add"
                    className="add-form"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    initialValues={{remember: true}}
                    autoComplete="off"
                    onFinish={submit}
                >
                    <Form.Item
                        id="name"
                        label="Book Name"
                        name="name"
                        rules={[{
                            required: true,
                            message: 'Please input a valid name!'
                        }]}

                    >
                        <Input

                        />
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
                    <Form.Item
                        id="pageCount"
                        label="Books Page Number"
                        name="pageCount"
                        rules={[{
                            required: true,
                            message: 'Please input a valid page number!',
                        }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        id="rating"
                        label="Book Rating"
                        name="rating"
                        rules={[{
                            required: true,
                            message: 'Please input a valid rating!'
                        }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        id="isbn"
                        label="Book ISBN"
                        name="isbn"
                        rules={[{
                            required: true,
                            message: 'Please input a valid ISBN!'
                        }]}

                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        id="authorName"
                        label="New Author Name"
                        name="authorName"
                        rules={[{
                            required: true,
                            message: 'Please input a valid author name!'
                        }]}
                    >
                        <Select
                            showSearch
                            placeholder="Select an author from list."
                            allowClear
                        >
                            {authorOptions}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Add
                        </Button>
                    </Form.Item>
                </Form>
                <p>{submitText}</p>

            </Modal>
        </>
    );
};

export default AddBook;