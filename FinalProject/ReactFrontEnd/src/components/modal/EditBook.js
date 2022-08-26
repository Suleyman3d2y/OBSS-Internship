import {Button, Form, Input, Modal, Popconfirm, Select} from 'antd';
import React, {useState} from 'react';
import axiosInstance from "../../util/axiosInstance";
import AuthorUtil from "../../util/authorUtil";
import GenreUtil from "../../util/genreUtil";
import {Option} from "antd/es/mentions";


const EditBook = (props) => {
    const updateUrl = `http://localhost:8080/api/v1/library/book/update/${props.id}`
    const removeUrl = `http://localhost:8080/api/v1/library/book/remove/${props.id}`
    const {authorOptions} = AuthorUtil();
    const {genreOptions} = GenreUtil();

    let data = {
        name: "",
        genre: "",
        pageCount: "",
        rating: "",
        authorName: ""
    }

    const [visible, setVisible] = useState(false);
    const [submitText, setSubmitText] = useState("");
    const [loading, setLoading] = useState(false);
    const showModal = () => {
        if (sessionStorage.getItem("role") === "ADMIN") {
            setVisible(true);
        } else {
            alert("Book editing is only for admins")
        }
    };

    function submit(e) {
        data = e;


        axiosInstance.put(updateUrl, data, {withCredentials: true}
        )
            .then(() => {
                setSubmitText("Book updated successfully")

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
                    setSubmitText("Book updating is only for admins. If you are an admin please log in with admin account.")

                } else {
                    setSubmitText("Book can not be updated right now please try again.")

                }
            })
    }

    function removeBook() {
        axiosInstance.delete(removeUrl, {
                withCredentials: true,

            }
        )
            .then(() => {

                setSubmitText("Book removed successfully")

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
                    setSubmitText("Book removing is only for admins. If you are an admin please log in with admin account.")

                } else {
                    setSubmitText("Book can not be removed right now please try again.")

                }
            })
    }

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Edit
            </Button>
            <Modal
                title="Edit Book"
                visible={visible}
                loading={loading}
                onCancel={() => setVisible(false)}
                onOk={() => setVisible(false)}
                footer={[
                    <Popconfirm title={"Sure to remove?"} onConfirm={removeBook}>
                        <Button type="primary" danger>
                            Delete
                        </Button>
                    </Popconfirm>
                    ,
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
                        initialValue={props.name}
                        rules={[{
                            required: true,
                            message: 'Please input a valid name!',
                            pattern: new RegExp('^[a-zA-Züğöçı0-9 ]*$')
                        }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        id="genre"
                        label="New Genre"
                        name="genre"
                        initialValue={props.genre.map((genre) => {
                            return <Option key={genre.name}>{genre.name}</Option>
                        })}
                        rules={[{
                            required: true,
                            message: 'Please select genre!',
                        }]}
                    >
                        <Select
                            showSearch
                            mode="tags"
                            style={{width: '%100'}}
                            placeholder="Select a genre from list."
                            optionFilterProp="children"
                            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                            allowClear
                        >
                            {genreOptions}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        id="pageCount"
                        label="New Page Number"
                        name="pageCount"
                        initialValue={props.pageCount}
                        rules={[{
                            required: true,
                            message: 'Please input a valid number!',
                            pattern: new RegExp('^[1-9]+[0-9]*$')
                        }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        id="rating"
                        label="New Rating"
                        name="rating"
                        initialValue={props.rating}
                        rules={[{
                            required: true,
                            message: 'Please input a valid rating!',
                            pattern: new RegExp('^[0-9](\\.[0-9])?$')
                        }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        id="authorName"
                        label="New Author Name"
                        name="authorName"
                        initialValue={props.authorName}
                        rules={[{
                            required: true,
                            message: 'Please input author name!'
                        }]}
                    >
                        <Select
                            showSearch
                            placeholder="Select an author from list."
                            allowClear
                        >
                            {authorOptions}
                        </Select>
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

export default EditBook;