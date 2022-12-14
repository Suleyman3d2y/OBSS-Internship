import React, {useState} from "react";
import {Layout, Menu, Space, Button} from 'antd';
import {HomeOutlined, BookOutlined, UserOutlined, ReadOutlined} from "@ant-design/icons"
import Title from 'antd/lib/typography/Title';
import SubMenu from 'antd/lib/menu/SubMenu';
import Sider from "antd/es/layout/Sider";
import {Content, Footer, Header} from "antd/es/layout/layout";
import {Link} from "react-router-dom";
import AddBook from "../modal/AddBook";
import AddUser from "../modal/AddUser";
import AddAuthorModal from "../modal/AddAuthor";
import AvatarMenu from "../AvatarMenu";
import ChangePassword from "../modal/ChangePassword";

const MainPage = (props) => {
    const [visible, setVisible] = useState(false)
    return (
        <div>
            <Layout>
                <Header style={{paddingBottom: 5, paddingLeft: 5, paddingRight: 5}}>
                    <Space style={{float: "right", paddingTop: 15}}>
                        <Button style={{float: "right"}}>
                            <Link to="/logout">Logout</Link>
                        </Button>
                        <AvatarMenu setVisible={setVisible}/>
                        <ChangePassword visible={visible} setVisible={setVisible}/>
                    </Space>
                    <Space>
                        <img src={require("../page/img/miniLogo-removebg-preview.png")} width="50" alt="miniLogo"/>
                        <Title style={{color: 'white'}} level={3}>BOOKSELF</Title>
                    </Space>

                </Header>
                <Layout>
                    <Sider>
                        <Menu
                            defaultSelectedKeys={['Dashboard']}
                            mode="inline"
                        >
                            <Menu.Item key="home" icon={<HomeOutlined/>}>
                                <Link to={{pathname: `/`}}>
                                    Home
                                </Link>
                            </Menu.Item>
                            <SubMenu key="book" icon={<BookOutlined/>}
                                     title={
                                         <span>
                                            <span>Book</span>
                                        </span>
                                     }
                            >
                                <Menu.ItemGroup>
                                    <Menu.Item key='bookList'>
                                        <Link to={{pathname: `/book-list`}}>
                                            Book List
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key='addBook'>
                                        <Space size="middle">
                                            <AddBook update={props.update}/>
                                        </Space>
                                    </Menu.Item>
                                </Menu.ItemGroup>
                            </SubMenu>

                            <SubMenu key="user" icon={<UserOutlined/>}
                                     title={
                                         <span>
                                            <span>User</span>
                                        </span>
                                     }
                            >
                                <Menu.ItemGroup>
                                    <Menu.Item key='userList'>
                                        <Link to={{pathname: `/user-list`}}>
                                            User List
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key='addUser'>
                                        <Space size="middle">
                                            <AddUser update={props.update}/>
                                        </Space>
                                    </Menu.Item>
                                </Menu.ItemGroup>
                            </SubMenu>
                            <SubMenu key="author" icon={<UserOutlined/>}
                                     title={
                                         <span>
                                            <span>Author</span>
                                        </span>
                                     }
                            >
                                <Menu.ItemGroup>
                                    <Menu.Item key='authorList'>
                                        <Link to={{pathname: `/author-list`}}>
                                            Author List
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key='addAuthor'>
                                        <Space size="middle">
                                            <AddAuthorModal update={props.update}/>
                                        </Space>
                                    </Menu.Item>
                                </Menu.ItemGroup>
                            </SubMenu>
                            <SubMenu key="lists" icon={<ReadOutlined/>}
                                     title={
                                         <span>
                                            <span>Lists</span>
                                        </span>
                                     }
                            >
                                <Menu.Item key='readList'>
                                    <Link to={{pathname: `/read-list`}}>
                                        Read List
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key='favList'>
                                    <Link to={{pathname: `/fav-list`}}>
                                        Favorite List
                                    </Link>
                                </Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Content style={{padding: '0 50px'}}>
                            {props.content}
                        </Content>
                        <Footer style={{textAlign: 'center'}}>BOOKSELF Created by S??leyman Emirhan Uslu</Footer>
                    </Layout>
                </Layout>
            </Layout>
        </div>

    );
}

export default MainPage;
