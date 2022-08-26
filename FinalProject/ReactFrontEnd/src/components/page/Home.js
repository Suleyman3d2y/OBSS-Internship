import React from 'react';
import {Layout, Breadcrumb} from 'antd';
import Top5List from "../table/Top5List";
import SearchBooks from "../table/SearchBooks";
import MainPage from "./MainPage";

const {Content} = Layout;

const Home = (props) => {

    const content = <Content style={{padding: '0 50px'}}>
        <Breadcrumb style={{margin: '16px 0'}}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{background: '#fff', padding: 24, minHeight: 580}}>
            <Top5List/>
            <br/><br/>
            <h2>SEARCH BOOKS</h2>
            <SearchBooks update={props.update} refresh={props.refresh}/>
            <br/><br/>
            <h2>For Book Recommendations Contact Us From: +905362090306</h2>

        </div>
    </Content>;

    return <MainPage content={content}/>
}

export default Home;