import {Button, Form, Input, Modal, Space} from "antd";
import React from "react";
import axios from "axios";

const ForgotPassword = (props) => {


    const sendEmail = (e) => {

        axios.post(`http://localhost:8080/api/v1/forgot-password/${e.email}`, null)
            .then((response) => alert(response.data))
            .catch(() => alert("An error ocurred please try again later."))

    }

    const ShowModal = () => {
        return (
            <Modal
                title="Forgot Password"
                visible={props.visible}
                onCancel={() => props.setVisible(false)}
                onOk={() => props.setVisible(false)}
                footer={[
                    <Button key="back" onClick={() => props.setVisible(false)}>
                        Cancel
                    </Button>,
                ]}
            >
                <div align="left">
                    <Space direction="vertical" align="left">
                        <h4>Tell us the email you used in your username, and we'll send you an email with a link to
                            reset your password.</h4>
                        <Form
                            name="Forgot Password"
                            className="forgot-password"
                            labelCol={{span: 8}}
                            wrapperCol={{span: 16}}
                            initialValues={{remember: true}}
                            autoComplete="off"
                            onFinish={sendEmail}
                        >
                            <Form.Item
                                id="email"
                                label="E-Mail"
                                name="email"
                                rules={[{
                                    required: true,
                                    message: 'Please input a valid email!',
                                    type: "email"
                                }]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Send
                                </Button>
                            </Form.Item>
                        </Form>
                    </Space>
                </div>


            </Modal>

        )
    }

    return (

        <Space>
            <Button type="link" htmlType="submit" onClick={() => props.setVisible(true)}>
                Forgot Password?
            </Button>
            <ShowModal/>
        </Space>


    )
}
export default ForgotPassword;