import {Button, Form, Input, Modal, Space} from "antd";
import React, {useState} from "react";
import axios from "axios";
import ForgotPassword from "./ForgotPassword";

const loginUrl = "http://localhost:8080/api/v1/login"


export default function Login({setData}, {credentials}) {

    const [visible, setVisible] = useState(false);
    const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false)

    async function loginUser(credentials) {
        return axios.post(loginUrl, credentials, {withCredentials: true}
        )
            .then(response => {
                setData({
                    jwt: response.data.jwt,
                    id: response.data.id,
                    role: response.data.role,
                    username: response.data.username,
                    createDate: response.data.createDate
                });
            })
            .catch((error) => {
                alert(error.response.data.error)
            })
    }

    const formSubmit = async e => {
        let loginCredentials
        credentials ? loginCredentials = credentials : loginCredentials = {
            username: e.username,
            password: e.password
        }
        await loginUser(loginCredentials);

    }

    const CreateModal = () => {
        return (
            <Modal
                title="Log In"
                visible={visible}
                onCancel={() => setVisible(false)}
                onOk={() => setVisible(false)}
                footer={[
                    <Button key="back" onClick={() => setVisible(false)}>
                        Cancel
                    </Button>,
                ]}
            >
                <Form
                    layout="horizontal"
                    title="Log In"
                    name="Login"
                    className="login-form"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    initialValues={{remember: true}}
                    onFinish={formSubmit}
                    autoComplete="off"

                >
                    <Form.Item
                        id="username"
                        label="Username"
                        name="username"
                        rules={[{
                            required: true,
                            message: 'Please input your username!'
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
                            message: 'Please input your password!'
                        }]}
                    >
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item>
                        <ForgotPassword visible={forgotPasswordVisible} setVisible={setForgotPasswordVisible} />
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                    </Form.Item>
                </Form>

            </Modal>

        )

    }


    return (
        <div align="left">
            <Space>
                <Button type="primary" shape="round" style={{width: 200}} onClick={() => setVisible(true)}>
                    Log In
                </Button>
                <CreateModal/>

            </Space>
        </div>
    );

}