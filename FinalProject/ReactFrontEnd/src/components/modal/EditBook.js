import {Button, Form, Input, Modal} from 'antd';
import React, {useState} from 'react';
import axios from "axios";


const EditBook = (props) => {
    const updateUrl = `http://localhost:8080/api/v1/library/book/update/${props.id}`
    const removeUrl = `http://localhost:8080/api/v1/library/book/remove/${props.id}`

    let data = {
        name: "",
        genre:"",
        pageCount:"",
        rating: "",
        authorId:""
    }

    const [visible, setVisible] = useState(false);
    const [submitText, setSubmitText] = useState("");
    const [loading, setLoading] = useState(false);
    const showModal = () => {
        setVisible(true);
    };

    function submit(e) {
        data = e;
        console.log(e);
        console.log(data);

        axios.put(updateUrl, data, {withCredentials: true}
        )
            .then(() => {
                setSubmitText("Book updated successfully")
                console.log(e)
                setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                    setVisible(false);
                }, 1000)
                window.location.reload()
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
        axios.delete(removeUrl, {withCredentials: true}
        )
            .then(() => {
                setSubmitText("Book removed successfully")

                setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                    setVisible(false);
                }, 1000)
                window.location.reload()
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
                    <Button type="primary" onClick={removeBook} danger>
                        Delete
                    </Button>,
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
                            enum: ["Action","Classic","Crime","Drama","Fantasy","Romance"],
                            type:"enum"
                        }]}
                    >
                        <Input/>
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
                        id="authorId"
                        label="New Author ID"
                        name="authorId"
                        initialValue={props.authorId}
                        rules={[{
                            required: true,
                            message: 'Please input a valid authorId!'
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