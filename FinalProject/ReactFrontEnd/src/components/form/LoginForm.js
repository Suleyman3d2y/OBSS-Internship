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
                sessionStorage.setItem("jwt",response.data.jwt);
                axios.get(`http://localhost:8080/api/v1/users/by-username?username=${e.username}`,{
                    withCredentials:true,
                    headers: {
                        "Authorization":`Bearer ${response.data.jwt}`
                    }
                })
                    .then((response) => {
                        if(response.data.roles.length > 1) {
                            sessionStorage.setItem("role","ADMIN")
                        }
                        else {
                            sessionStorage.setItem("role","USER")
                        }
                        sessionStorage.setItem("id",response.data.id)
                        navigate(`/home`)
                    })
                    .catch((err) => console.log(err))
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

