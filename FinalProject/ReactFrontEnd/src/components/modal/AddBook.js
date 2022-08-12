import {Button, Form, Input,Modal} from 'antd';
import React, {useState} from 'react';
import axios from "axios";



const AddBook = () => {

    const url = "http://localhost:8080/api/v1/library/book/add"

    let data = {
        name: "",
        genre:"",
        pageCount:"",
        rating: "",
        isbn:"",
        authorId:""
    }
    const [visible, setVisible] = useState(false);
    const [submitText, setSubmitText] = useState("");
    const [loading, setLoading] = useState(false);
    const showModal = () => {
        setVisible(true);
    };

    function submit(e) {
        data.name = e.name;
        data.genre = e.genre;
        data.pageCount = e.pageCount;
        data.rating = e.rating;
        data.isbn = e.isbn;
        data.authorId = e.authorId;
        console.log(data)

        axios.post(url, data, {withCredentials: true}
        )
            .then(() => {
                setSubmitText("Book added successfully")
                console.log(e)
                setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                    setVisible(false);
                }, 1000)
                window.location.reload()
            })

            .catch((err) => {
                console.log(err)
                if(err.response.status === 401){
                    setSubmitText(
                        "You are unauthorized. If you are an admin please log in with admin account."
                    )

                }
                else if(err.response.status === 500 && err.response.data.error === "Access is denied") {
                    setSubmitText("Book adding is only for admins. If you are an admin please log in with admin account.")

                }
                else {
                    setSubmitText("Book can not be added right now please try again.")

                }
            })
    }


    return (
        <>
            <Button type="text"  onClick={showModal}>
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
                        label="Book Genre"
                        name="genre"
                        rules={[{
                            required: true,
                            message: 'Please input a valid genre!(Action,Classic,Crime,Drama,Fantasy,Romance)',
                            enum: ["Action","Classic","Crime","Drama","Fantasy","Romance"],
                            type:"enum"
                        }]}
                    >
                        <Input/>
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
                        id="authorId"
                        label="Author ID"
                        name="authorId"
                        rules={[{
                            required: true,
                            message: 'Please input a valid author ID!'
                        }]}
                    >
                        <Input/>
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