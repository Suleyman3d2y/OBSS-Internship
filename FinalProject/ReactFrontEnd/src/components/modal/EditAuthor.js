import {Button, Form, Input, Modal, Popconfirm} from 'antd';
import React, {useState} from 'react';
import axiosInstance from "../../util/axiosInstance";


const EditAuthorModal = (props) => {
    const updateUrl = `http://localhost:8080/api/v1/library/author/update/${props.id}`
    const removeUrl = `http://localhost:8080/api/v1/library/author/remove/${props.id}`

    let data = {
        name: ""
    }

    const [visible, setVisible] = useState(false);
    const [submitText, setSubmitText] = useState("");
    const [loading, setLoading] = useState(false);
    const showModal = () => {
        if(sessionStorage.getItem("role") === "ADMIN") {
            setVisible(true);
        }
        else {
            alert("Author editing is only for admins")
        }
    };

    function submit(e) {
        data.name = e.name;

        axiosInstance.put(updateUrl, data, {
                withCredentials:true,
            }
        )
            .then(() => {
                setSubmitText("Author updated successfully")

                setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                    setVisible(false);
                }, 1000)
                props.update();
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    setSubmitText(
                        "You are unauthorized. If you are an admin please log in with admin account."
                    )

                } else if (err.response.status === 500 && err.response.data.error === "Access is denied") {
                    setSubmitText("Author updating is only for admins. If you are an admin please log in with admin account.")

                } else {
                    setSubmitText("Author can not be updated right now please try again.")

                }
            })
    }

    function removeAuthor() {
        axiosInstance.delete(removeUrl, {withCredentials: true}
        )
            .then(() => {
                setSubmitText("Author deleted successfully")

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
                    setSubmitText("Author removing is only for admins. If you are an admin please log in with admin account.")

                } else {
                    setSubmitText("Author can not be removed right now please try again.")

                }
            })
    }


    return (
        <>
            <Button type="primary" onClick={showModal}>
                Edit
            </Button>
            <Modal
                title="Edit Author"
                visible={visible}
                loading={loading}
                onCancel={() => setVisible(false)}
                onOk={() => setVisible(false)}
                footer={[
                    <Popconfirm title={"Sure to remove?"} onConfirm={removeAuthor}>
                        <Button type="primary" danger>
                            Delete
                        </Button>
                    </Popconfirm>,
                    <Button key="back" onClick={() => setVisible(false)}>
                        Cancel
                    </Button>,
                ]}
            >
                <Form
                    name="Edit"
                    className="edit-form"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    initialValues={{remember: true}}
                    autoComplete="off"
                    onFinish={submit}
                >
                    <Form.Item
                        id="name"
                        label="New Name"
                        name="name"
                        rules={[{
                            required: true,
                            message: 'Please input a valid name!'
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
                            Update
                        </Button>
                    </Form.Item>
                </Form>
                <p>{submitText}</p>
            </Modal>
        </>
    );
};

export default EditAuthorModal;