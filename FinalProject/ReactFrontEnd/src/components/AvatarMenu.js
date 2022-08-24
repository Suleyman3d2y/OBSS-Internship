import {Avatar, Button, Popover, Space} from "antd";
import React from "react";
import {UserOutlined} from "@ant-design/icons";

const AvatarMenu = (props) => {

    const content = (

        <Space direction="vertical" size="medium">
            <h4>Username: {sessionStorage.getItem("username")}</h4>
            <h4>Role: {sessionStorage.getItem("role")}</h4>
            <h4>Created at: {sessionStorage.getItem("createDate").slice(0,16)}</h4>
            <Button type="text" onClick={() => props.setVisible(true)}>
                Change Password
            </Button>
        </Space>

    )

    return (
        <>
            <Popover placement="bottomRight" title="User Menu" content={content} trigger="click">
                <Avatar style={{float: 'right'}} icon={<UserOutlined/>}>
                </Avatar>
            </Popover>
        </>

    )
}

export default AvatarMenu