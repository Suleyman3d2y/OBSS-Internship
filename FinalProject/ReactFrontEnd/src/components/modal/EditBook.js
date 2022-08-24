import {Button, Form, Input, Modal, Popconfirm, Select} from 'antd';
import React, {useEffect, useState} from 'react';
import axiosInstance from "../../util/axiosInstance";
import BookService from "../../service/BookService";
import {Option} from "antd/es/mentions";



const EditBook = (props) => {
    const updateUrl = `http://localhost:8080/api/v1/library/book/update/${props.id}`
    const removeUrl = `http://localhost:8080/api/v1/library/book/remove/${props.id}`
    const [authorOptions, setAuthorOptions] = useState([]);
    const genre = ["Art", "Biography", "Business", "Chick Lit", "Children's", "Christian", "Classics",
        "Comics", "Contemporary", "Cookbooks", "Crime", "Ebooks", "Fantasy", "Fiction",
        "Gay and Lesbian", "Graphic Novels", "Historical Fiction", "History", "Horror",
        "Humor and Comedy", "Manga", "Memoir", "Music", "Mystery", "Nonfiction", "Paranormal",
        "Philosophy", "Poetry", "Psychology", "Religion", "Romance", "Science", "Science Fiction",
        "Self Help", "Suspense", "Spirituality", "Sports", "Thriller", "Travel", "Young Adult"]
    const [genreOptions,setGenreOptions] = useState([]);
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
            options.push(<Option key = {author.name}>{author.name}</Option>)
        })
        setAuthorOptions(options);

    }

    useEffect(() => {
        getAllAuthorData()
        getGenreOptions()
    },[props.refresh])


    let data = {
        name: "",
        genre:"",
        pageCount:"",
        rating: "",
        authorName:""
    }

    const [visible, setVisible] = useState(false);
    const [submitText, setSubmitText] = useState("");
    const [loading, setLoading] = useState(false);
    const showModal = () => {
        if(sessionStorage.getItem("role") === "ADMIN") {
            setVisible(true);
        }
        else {
            alert("Book editing is only for admins")
        }
    };

    function submit(e) {
        data = e;


        axiosInstance.put(updateUrl, data, {withCredentials: true}
        )
            .then(() => {
                setSubmitText("Book updated successfully")

                setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                    setVisible(false);
                }, 1000)
                props.update();
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    setSubmitText(
                        "You are unauthorized. If you are an admin please log in with admin account."
                    )

                } else if (err.response.status === 500 && err.response.data.error === "Access is denied") {
                    setSubmitText("Book updating is only for admins. If you are an admin please log in with admin account.")

                } else {
                    setSubmitText("Book can not be updated right now please try again.")

                }
            })
    }

    function removeBook() {
        axiosInstance.delete(removeUrl, {
                withCredentials:true,

            }
        )
            .then(() => {

                setSubmitText("Book removed successfully")

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
                    setSubmitText("Book removing is only for admins. If you are an admin please log in with admin account.")

                } else {
                    setSubmitText("Book can not be removed right now please try again.")

                }
            })
    }


    return (
        <>
            <Button type="primary" onClick={showModal}>
                Edit
            </Button>
            <Modal
                title="Edit Book"
                visible={visible}
                loading={loading}
                onCancel={() => setVisible(false)}
                onOk={() => setVisible(false)}
                footer={[
                    <Popconfirm title={"Sure to remove?"} onConfirm={removeBook}>
                        <Button type="primary" danger>
                            Delete
                        </Button>
                    </Popconfirm>
                    ,
                    <Button key="back" onClick={() => setVisible(false)}>
                        Cancel
                    </Button>,
                ]}
            >
                <Form
                    name="Edit"
                    className="edit-form"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    initialValues={{remember: true}}
                    autoComplete="off"
                    onFinish={submit}
                >
                    <Form.Item
                        id="name"
                        label="New Name"
                        name="name"
                        initialValue={props.name}
                        rules={[{
                            required: true,
                            message: 'Please input a valid book name!'
                        }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        id="genre"
                        label="New Genre"
                        name="genre"
                        initialValue={props.genre}
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
                        label="New Page Number"
                        name="pageCount"
                        initialValue={props.pageCount}
                        rules={[{
                            required: true,
                            message: 'Please input a valid page number!'
                        }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        id="rating"
                        label="New Rating"
                        name="rating"
                        initialValue={props.rating}
                        rules={[{
                            required: true,
                            message: 'Please input updated book rating!'
                        }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        id="authorName"
                        label="New Author Name"
                        name="authorName"
                        initialValue={props.authorName}
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
                            Update
                        </Button>
                    </Form.Item>
                </Form>
                <p>{submitText}</p>
            </Modal>
        </>
    );
};

export default EditBook;