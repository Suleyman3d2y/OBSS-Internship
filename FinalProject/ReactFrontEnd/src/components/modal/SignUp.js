import {Button, Form, Input, Modal, Space} from "antd";
import React, {useState} from "react";
import axios from "axios";

export default function SignUp(props) {

    const url = "http://localhost:8080/api/v1/signup"
    const [visible, setVisible] = useState(false);
    const [submitText, setSubmitText] = useState("");
    const [loading, setLoading] = useState(false);
    const loginUrl = "http://localhost:8080/api/v1/login"

    function loginUser(credentials) {
        return axios.post(loginUrl, credentials, {withCredentials: true}
        )
            .then(response => {
                props.setData({
                    jwt: response.data.jwt,
                    id: response.data.id,
                    role: response.data.role,
                    username: response.data.username,
                    createDate: response.data.createDate
                });
            })
            .catch(() => {
                alert("Wrong username or password")
            })
    }

    const formSubmit = (e) => {
        let data = {
            username: "",
            password: "",
            role: "User"
        }
        data.username = e.username
        data.password = e.password

        axios.post(url, data, {
                withCredentials: true,
            }
        )
            .then(async () => {
                setSubmitText("Welcome to BOOKSELF :)")
                setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                    setVisible(false);
                    loginUser({username: data.username, password: data.password});
                }, 3000)


            })

            .catch(() => {
                setSubmitText("An error occurred please try again.")
            })

    }

    const CreateModal = () => {
        return (
            <Modal
                title="Sign Up"
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
                    name="SignUp"
                    className="signup"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    initialValues={{remember: true}}
                    autoComplete="off"
                    onFinish={formSubmit}
                >
                    <Form.Item
                        id="username"
                        label="Username"
                        name="username"
                        rules={[{
                            required: true,
                            message: 'Please input a valid name!(Must be email)',
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
                            message: 'Please input password!'
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
                                    if (!value || getFieldValue('newPassword') === value) {
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
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>
                <p>{submitText}</p>
            </Modal>

        )

    }

    return (
        <div align="left">
            <Space>
                <Button type="primary" shape="round" style={{width: 200}} onClick={() => setVisible(true)}>
                    Sign Up
                </Button>
                <CreateModal/>
            </Space>
        </div>
    );

}