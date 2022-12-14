import {Button, Form, Input, Modal, Select} from 'antd';
import React, {useState} from 'react';
import axiosInstance from "../../util/axiosInstance";
import {Option} from "antd/es/mentions";


const AddUser = (props) => {

    const url = "http://localhost:8080/api/v1/users/"


    const [visible, setVisible] = useState(false);
    const [submitText, setSubmitText] = useState("");
    const [loading, setLoading] = useState(false);
    const showModal = () => {
        if (sessionStorage.getItem("role") === "ADMIN") {
            setVisible(true);
        } else {
            alert("User adding is only for admins")
        }
    };
    let data = {
        username: "username",
        password: "password",
        role: ""
    }

    const Submit = (e) => {

        data.username = e.username
        data.password = e.password
        data.role = e.role


        axiosInstance.post(url, data, {
                withCredentials: true,
            }
        )
            .then(() => {
                setSubmitText("User added successfully")
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
                    setSubmitText("User adding is only for admins. If you are an admin please log in with admin account.")

                } else {
                    setSubmitText("User can not be added right now please try again.")

                }
            })


    }

    return (
        <>
            <Button type="text" onClick={showModal}>
                Add User
            </Button>
            <Modal
                title="Add User"
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
                    onFinish={Submit}
                >
                    <Form.Item
                        id="username"
                        label="Username"
                        name="username"
                        rules={[{
                            required: true,
                            message: 'Please input name!(Must be email)',
                            type: "email"
                        }]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        id="password"
                        label="Password"
                        name="password"
                        rules={[{
                            required: true,
                            message: 'Please input user password!'
                        }]}
                    >
                        <Input.Password/>

                    </Form.Item>

                    <Form.Item
                        id="confirmPassword"
                        label="Confirm Password"
                        name="confirmPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password/>

                    </Form.Item>

                    <Form.Item
                        id="role"
                        label="Role"
                        name="role"
                        rules={[{
                            required: true,
                            message: 'Please select a user role!',
                        }]}
                    >
                        <Select
                            placeholder="Select a role for the user."
                            allowClear
                        >
                            <Option value="Admin">Admin</Option>
                            <Option value="User">User</Option>
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

export default AddUser;