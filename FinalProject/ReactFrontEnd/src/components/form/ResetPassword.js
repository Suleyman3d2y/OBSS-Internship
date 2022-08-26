import {Button, Form, Input, Space} from "antd";
import React from "react";
import axios from "axios";
import {useNavigate, useSearchParams} from "react-router-dom";

const ResetPassword = () => {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const submit = (e) => {

        const data = {
            password: e.password
        }
            axios.put(`http://localhost:8080/api/v1/reset-password/${searchParams.get("token")}`, data)
                .then(() => {
                    alert("Password successfully changed.")
                    navigate("/")
                })
                .catch(() => {
                    alert("An error ocurred please try again.")
                })

    }

    return (
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