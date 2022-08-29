import {Button, Form, Input, Modal} from "antd";
import React from "react";
import axiosInstance from "../../util/axiosInstance";

const ChangePassword = (props) => {


    function submit(e) {
        const data = {
            username: sessionStorage.getItem("username"),
            currentPassword: e.currentPassword,
            newPassword: e.newPassword
        }

        axiosInstance.put("http://localhost:8080/api/v1/change-password", data, {
                withCredentials: true,
            }
        )
            .then(() => {
                alert("Password is changed.")
                props.setVisible(false);
            })
            .catch(() => {
                alert("Password cannot be changed right now.")
            })


    }


    return (
        <Modal
            title="Change Password"
            visible={props.visible}
            onCancel={() => props.setVisible(false)}
            onOk={() => props.setVisible(false)}
            footer={[
                <Button key="back" onClick={() => props.setVisible(false)}>
                    Cancel
                </Button>,
            ]}
        >
            <Form
                name="ChangePassword"
                className="change-password"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                initialValues={{remember: true}}
                autoComplete="off"
                onFinish={submit}
            >
                <Form.Item
                    id="currentPassword"
                    label="Current Password"
                    name="currentPassword"
                    rules={[{
                        required: true,
                        message: 'Please input your password!'
                    }]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    id="newPassword"
                    label="New Password"
                    name="newPassword"
                    rules={[{
                        required: true,
                        message: 'Please input your password!'
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
                        Change
                    </Button>
                </Form.Item>
            </Form>

        </Modal>
    )

}
export default ChangePassword