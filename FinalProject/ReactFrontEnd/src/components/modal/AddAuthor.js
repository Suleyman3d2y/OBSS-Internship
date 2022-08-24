import {Button, Form, Input, Modal} from 'antd';
import React, {useState} from 'react';
import axiosInstance from "../../util/axiosInstance";

const AddAuthorModal = (props) => {

    const url = "http://localhost:8080/api/v1/library/author/add"

    const [visible, setVisible] = useState(false);
    const [submitText, setSubmitText] = useState("");
    const [loading, setLoading] = useState(false);
    const showModal = () => {
        if(sessionStorage.getItem("role") === "ADMIN") {
            setVisible(true);
        }
        else {
            alert("Author adding is only for admins")
        }
    };
    let data = {
        name: ""
    }

    const Submit = (e) => {

        data.name = e.name
        axiosInstance.post(url, data, {
                withCredentials:true,
            }
        )
            .then(() => {
                setSubmitText("Author added successfully")
                setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                    setVisible(false);
                }, 1000)
                props.update()
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    setSubmitText(
                        "You are unauthorized. If you are an admin please log in with admin account."
                    )

                } else if (err.response.status === 500 && err.response.data.error === "Access is denied") {
                    setSubmitText("Author adding is only for admins. If you are an admin please log in with admin account.")

                } else {
                    setSubmitText("Author can not be added right now please try again.")

                }
            })


    }

    return (
        <>
            <Button type="text" onClick={showModal}>
                Add Author
            </Button>
            <Modal
                title="Add Author"
                visible={visible}
                loading={loading}
                onCancel={() => setVisible(false)}
                onOk={() => setVisible(false)}
                footer={[
                    <Button key="back" onClick={() => setVisible(false)}>
                        Cancel
                    </Button>,
                ]}
            >
                <Form
                    name="Add"
                    className="add-form"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    initialValues={{remember: true}}
                    autoComplete="off"
                    onFinish={Submit}
                >
                    <Form.Item
                        id="name"
                        label="Name"
                        name="name"
                        rules={[{
                            required: true,
                            message: 'Please input a valid name!',
                        }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Add
                        </Button>
                    </Form.Item>
                </Form>
                <p>{submitText}</p>
            </Modal>
        </>
    );
};

export default AddAuthorModal;