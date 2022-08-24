import {Button, Form, Input, Space} from "antd";
import React from "react";
import axios from "axios";
import {useNavigate, useSearchParams} from "react-router-dom";

const ResetPassword = () => {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const submit = (e) => {
        const confirmPassword = e.confirmPassword
        const data = {
            password: e.password
        }
        if(data.password === confirmPassword) {
            axios.put(`http://localhost:8080/api/v1/reset-password/${searchParams.get("id")}`,data)
                .then(() => {
                    alert("Password succesfully changed.")
                    navigate("/")
                })
                .catch((error) => {
                    alert(error)
                })
        }
        else {
            alert("Passwords did not matched.")
        }

    }

    return(
        <div align="center">
            <Space>
                <Form
                    name="Reset Password"
                    className="reset-password"
                    labelCol={{span: 10}}
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
            </Space>
        </div>



    )
}
export default ResetPassword