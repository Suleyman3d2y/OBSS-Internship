import axios from "axios";
import {Button, Form, Input, Space} from "antd";
import {useNavigate} from "react-router-dom";


function LoginForm() {

    const navigate = useNavigate();
    const loginUrl = "http://localhost:8080/api/v1/login"
    const formData = new FormData();

    function submit(e) {
        formData.set("username", e.username)
        formData.set("password", e.password)

        axios.post(loginUrl, formData, {withCredentials: true}
        )
            .then(response => {
                axios.get(`http://localhost:8080/api/v1/users/by-username?username=${e.username}`,{withCredentials:true})
                    .then((response) => {
                        navigate(`/home?id=${response.data.id}`)
                    })
            })
            .catch((err) => {
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

