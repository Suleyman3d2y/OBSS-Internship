import React from "react";
import {Layout, Avatar, Menu, Breadcrumb, Space, Table, Button} from 'antd';
import {HomeOutlined,BookOutlined,UserOutlined,ReadOutlined} from "@ant-design/icons"
import Title from 'antd/lib/typography/Title';
import SubMenu from 'antd/lib/menu/SubMenu';
import Sider from "antd/es/layout/Sider";
import {Content, Footer, Header} from "antd/es/layout/layout";
import {Link} from "react-router-dom";
import AddBook from "../modal/AddBook";
import AddUser from "../modal/AddUser";
import AddAuthorModal from "../modal/AddAuthor";

class TableComponent extends React.Component {

    render() {
        return (
            <div>
                <Layout>
                    <Header style={{padding: 10}}>

                        <Space style={{float: "right"}}>
                            <Button style={{float: "right"}}>
                                <Link to="/logout">Logout</Link>
                            </Button>
                            <Avatar style={{float: 'right'}} src='./dp.png'>
                                {sessionStorage.getItem("role")}
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
                                    <Link to={{pathname: `/`}}>
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
                                            <Link to={{pathname: `/book-list`}}>
                                                Book List
                                            </Link>
                                        </Menu.Item>
                                        <Menu.Item key='addBook'>
                                            <Space size="middle">
                                                <AddBook render={this.props.render}/>
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
                                            <Link to={{pathname: `/user-list`}}>
                                                User List
                                            </Link>
                                        </Menu.Item>
                                        <Menu.Item key='addUser'>
                                            <Space size="middle">
                                                <AddUser render={this.props.render}/>
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
                                            <Link to={{pathname: `/author-list`}}>
                                                Author List
                                            </Link>
                                        </Menu.Item>
                                        <Menu.Item key='addAuthor'>
                                            <Space size="middle">
                                                <AddAuthorModal render={this.props.render}/>
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
                                <Breadcrumb style={{margin: '16px 0'}}>
                                    <Breadcrumb.Item>{this.props.name}</Breadcrumb.Item>
                                </Breadcrumb>
                                <div style={{background: '#fff', padding: 24, minHeight: 580}}>
                                    <Table
                                        columns={this.props.columns}
                                        dataSource={this.props.dataSource}
                                        rowKey={record => record.id}
                                        loading={this.props.loading}
                                        pagination={this.props.pagination}
                                        onChange={this.props.handleTableChange}
                                    />
                                </div>
                            </Content>
                            <Footer style={{textAlign: 'center'}}>BOOKSELF Created by Süleyman Emirhan Uslu</Footer>
                        </Layout>
                    </Layout>
                </Layout>
            </div>

        );
    }

}

export default TableComponent;
