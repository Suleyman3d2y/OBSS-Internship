import React, {useState} from 'react';
import {Layout, Avatar, Menu, Breadcrumb, Space, Button} from 'antd';
import {HomeOutlined,BookOutlined,UserOutlined,ReadOutlined} from "@ant-design/icons"
import Title from 'antd/lib/typography/Title';
import SubMenu from 'antd/lib/menu/SubMenu';
import {Link, useSearchParams} from "react-router-dom";
import axios from "axios";
import AddBook from "./modal/AddBook";
import AddUserModal from "./modal/AddUserModal";
import AddAuthorModal from "./modal/AddAuthor";
import Top5List from "./Top5List";
import PreferForm from "./form/PreferBook";


const {Header, Footer, Sider, Content} = Layout;

function Home() {


    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const [role,setRole] = useState("");

    if(role === ""){
        axios.get(`http://localhost:8080/api/v1/users/${id}`,{
            withCredentials : true
        })
            .then((response) => {
                if(response.data.roles.length >1) {
                    setRole("ADMIN");
                }
                else {
                    setRole("USER")
                }
            })
            .catch(() => {console.log("error in Home")})
    }


    return (
        <div>
            <Layout>
                <Header style={{padding: 10}}>


                    <Space style={{float:"right"}}>
                        <Button style={{float:"right"}} >
                            <Link to="/logout">Logout</Link>
                        </Button>
                        <Avatar style={{float: 'right'}} src='./dp.png'>
                            {role}
                        </Avatar>
                    </Space>


                    <Title style={{color: 'white'}} level={3}>BOOKSELF</Title>
                </Header>
                <Layout>
                    <Sider>
                        <Menu
                            defaultSelectedKeys={['Dashboard']}
                            mode="inline"
                        >
                            <Menu.Item key="home" icon={<HomeOutlined />}>
                                <Link to={{pathname: `/home?id=${id}`}}>
                                    Home
                                </Link>
                            </Menu.Item>
                            <SubMenu key ="book" icon={<BookOutlined />}
                                     title={
                                         <span>
                                            <span>Book</span>
                                        </span>
                                     }
                            >
                                <Menu.ItemGroup>
                                    <Menu.Item key='bookList'>
                                        <Link to={{pathname: `/book-list?id=${id}`}}>
                                            Book List
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key='addBook'>
                                        <Space size="middle">
                                            <AddBook/>
                                        </Space>
                                    </Menu.Item>
                                </Menu.ItemGroup>
                            </SubMenu>

                            <SubMenu key ="user" icon={<UserOutlined />}
                                     title={
                                         <span>
                                            <span>User</span>
                                        </span>
                                     }
                            >
                                <Menu.ItemGroup>
                                    <Menu.Item key='userList'>
                                        <Link to={{pathname: `/user-list?id=${id}`}}>
                                            User List
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key='addUser'>
                                        <Space size="middle">
                                            <AddUserModal/>
                                        </Space>
                                    </Menu.Item>
                                </Menu.ItemGroup>
                            </SubMenu>
                            <SubMenu key ="author" icon={<UserOutlined />}
                                     title={
                                         <span>
                                            <span>Author</span>
                                        </span>
                                     }
                            >
                                <Menu.ItemGroup>
                                    <Menu.Item key='authorList'>
                                        <Link to={{pathname: `/author-list?id=${id}`}}>
                                            Author List
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key='addAuthor'>
                                        <Space size="middle">
                                            <AddAuthorModal/>
                                        </Space>
                                    </Menu.Item>
                                </Menu.ItemGroup>
                            </SubMenu>
                            <SubMenu key="lists" icon={<ReadOutlined />}
                                     title={
                                         <span>
                                            <span>Lists</span>
                                        </span>
                                     }
                            >
                                <Menu.Item key='readList' >
                                    <Link to={{pathname: `/read-list?id=${id}`}}>
                                        Read List
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key='favList'>
                                    <Link to={{pathname: `/fav-list?id=${id}`}}>
                                        Favorite List
                                    </Link>
                                </Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Content style={{padding: '0 50px'}}>
                            <Breadcrumb style={{margin: '16px 0'}}>
                                <Breadcrumb.Item>Home</Breadcrumb.Item>
                            </Breadcrumb>
                            <div style={{background: '#fff', padding: 24, minHeight: 580}}>
                                <Top5List />
                                <br/><br/>
                                <h2>FIND BOOKS YOU PREFER</h2>
                                <PreferForm />
                                <br/><br/>
                                <h2>For Book Recommendations Contact Us From: +905362090306</h2>


                            </div>
                        </Content>

                        <Footer style={{textAlign: 'center'}}>BOOKSELF Created by Süleyman Emirhan Uslu</Footer>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    );
}

export default Home;