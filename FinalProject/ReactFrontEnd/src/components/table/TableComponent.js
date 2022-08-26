import React from "react";
import {Breadcrumb, Table} from 'antd';
import {Content} from "antd/es/layout/layout";

import MainPage from "../page/MainPage";

const TableComponent = (props) => {

    const content = <Content style={{padding: '0 50px'}}>
        <Breadcrumb style={{margin: '16px 0'}}>
            <Breadcrumb.Item>{props.name}</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{background: '#fff', padding: 24, minHeight: 580}}>
            <Table
                columns={props.columns}
                dataSource={props.dataSource}
                rowKey={record => record.id}
                loading={props.loading}
                pagination={props.pagination}
                onChange={props.handleTableChange}
            />
        </div>
    </Content>

        return (
            <MainPage content = {content} />
        );
    }

export default TableComponent;
