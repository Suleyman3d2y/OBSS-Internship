import axios from "axios";
import {Button, Form, Input, Space} from "antd";
import {useNavigate} from "react-router-dom";


function LoginForm() {

    const navigate = useNavigate();
    const loginUrl = "http://localhost:8080/api/v1/login"
    const data = {
        username: "",
        password:""
    }

    function submit(e) {
        data.username = e.username
        data.password = e.password

        axios.post(loginUrl, data, {withCredentials: true}
        )
            .then(response => {
                sessionStorage.setItem("id",response.data.id)
                sessionStorage.setItem("role",response.data.role)
                sessionStorage.setItem("jwt",response.data.jwt)
                navigate("/home")
                window.location.reload();
            })
            .catch(() => {
                alert("Wrong username or password")
            })

    }

    return (
        <div align="center">
        <Space>
        <Form
            layout="horizontal"
            title="Log In"
            name="Login"
            className="login-form"
            labelCol={{ span:8 }}
            wrapperCol={{ span:16 }}
            initialValues={{ remember: true }}
            onFinish={submit}
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
            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type="primary" htmlType="submit">
                    Login
                </Button>
            </Form.Item>
        </Form>
        </Space>
        </div>
    );
}

export default LoginForm;


