import {Button, Form, Input, Modal, Select} from 'antd';
import React, {useState} from 'react';
import axiosInstance from "../../util/axiosInstance";
import GenreUtil from "../../util/genreUtil";
import AuthorUtil from "../../util/authorUtil";

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
    const {genreOptions} = GenreUtil();
    const {authorOptions} = AuthorUtil();


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
                        label="Name"
                        name="name"
                        rules={[{
                            required: true,
                            message: 'Please input a valid name!',
                            pattern: new RegExp('^[a-zA-Züğöçı0-9 ]*$')
                        }]}

                    >
                        <Input

                        />
                    </Form.Item>

                    <Form.Item
                        id="genre"
                        label="Genre"
                        name="genre"
                        rules={[{
                            required: true,
                            message: 'Please select genre!',
                        }]}
                    >
                        <Select
                            showSearch
                            mode="tags"
                            style={{width: '%100'}}
                            placeholder="Select genre tags from list."
                            optionFilterProp="children"
                            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                            allowClear
                        >
                            {genreOptions}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        id="pageCount"
                        label="Page Number"
                        name="pageCount"
                        rules={[{
                            required: true,
                            message: 'Please input a valid number!',
                            pattern: new RegExp('^[1-9]+[0-9]*$')
                        }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        id="rating"
                        label="Rating"
                        name="rating"
                        rules={[{
                            required: true,
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
                            required: true,
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
                            required: true,
                            message: 'Please input a valid author name!',
                            pattern: new RegExp('^[a-zA-Züğöçı ]*$')
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