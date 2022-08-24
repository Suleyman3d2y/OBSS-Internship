import {Button, Form, Input, Modal} from "antd";
import React from "react";
import axiosInstance from "../../util/axiosInstance";

const ChangePassword = (props) => {



    function submit(e) {
        const confirmPassword = e.confirmPassword
        const data = {
            username:sessionStorage.getItem("username"),
            currentPassword: e.currentPassword,
            newPassword: e.newPassword
        }
        console.log(confirmPassword === data.newPassword)

        if(confirmPassword === data.newPassword) {
            axiosInstance.put("http://localhost:8080/api/v1/change-password", data, {
                    withCredentials:true,
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
        else {
            alert("Passwords did not match.")
        }

    }


    return(
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
                        message: 'Please input a valid password!'
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
                        message: 'Please input a valid password!'
                    }]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    id="confirmPassword"
                    label="Confirm Password"
                    name="confirmPassword"
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
                        Change
                    </Button>
                </Form.Item>
            </Form>

        </Modal>
    )

}
export default ChangePassword