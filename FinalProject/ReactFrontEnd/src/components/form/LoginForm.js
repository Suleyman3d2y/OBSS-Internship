import axios from "axios";
import {Button, Form, Input, Space} from "antd";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";

    const loginUrl = "http://localhost:8080/api/v1/login"

    async function loginUser(credentials) {
        return axios.post(loginUrl, credentials, {withCredentials: true}
        )
            .then(response => {
                return response.data
            })
            .catch(() => {
                alert("Wrong username or password")
            })
    }

export default function Login({setData}) {
        const navigate = useNavigate();

      const submit = async e => {
            const responseData = await loginUser({
                username: e.username,
                password: e.password
            });

            setData({
                jwt:responseData.jwt,
                id:responseData.id,
                role:responseData.role
            });


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

    Login.propTypes = {
        setData: PropTypes.func.isRequired
    }







