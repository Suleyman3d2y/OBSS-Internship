import {Button, Form, Input, Modal} from 'antd';
import React, {useState} from 'react';
import axios from "axios";


const EditUser = (props) => {
    const updateUrl = `http://localhost:8080/api/v1/users/${props.id}`
    const removeUrl = `http://localhost:8080/api/v1/users/${props.id}`

    let data = {
        password: ""
    }

    const [visible, setVisible] = useState(false);
    const [submitText, setSubmitText] = useState("");
    const [loading, setLoading] = useState(false);
    const showModal = () => {
        setVisible(true);
    };

    function submit(e) {
        data.password = e.password;

        axios.put(updateUrl, data, {withCredentials: true}
        )
            .then(() => {
                setSubmitText("User updated successfully")
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
                    setSubmitText("User updating is only for admins. If you are an admin please log in with admin account.")

                } else {
                    setSubmitText("User can not be updated right now please try again.")

                }
            })
    }

    function removeBook() {
        axios.delete(removeUrl, {withCredentials: true}
        )
            .then(() => {
                setSubmitText("User deleted successfully")

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
                    setSubmitText("User removing is only for admins. If you are an admin please log in with admin account.")

                } else {
                    setSubmitText("User can not be removed right now please try again.")

                }
            })
    }


    return (
        <>
            <Button type="primary" onClick={showModal}>
                Edit
            </Button>
            <Modal
                title="Edit User"
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
                        id="password"
                        label="New Password"
                        name="password"
                        rules={[{
                            required: true,
                            message: 'Please input a valid password!'
                        }]}
                    >
                        <Input.Password/>
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

export default EditUser;