import {List} from 'antd';
import React from 'react';
import BookService from "../../service/BookService";


const bookservice = new BookService();

class Top5List extends React.Component {

    state = {
        data: [],
    };

    componentDidMount() {

        this.fetch();
    }

    fetch = async () => {

        const bookData = await bookservice.fetchTop5Data();
        this.setState({
            data: bookData
        })
    }

    render() {
        return (
            <>
                <List
                    size="small"
                    header={<div><h2>TOP 5 NEW BOOKS</h2></div>}
                    bordered
                    dataSource={this.state.data.map((item) => {
                        return item;
                    })}
                    renderItem={(item) => (
                        <List.Item>
                            <img src={`https://covers.openlibrary.org/b/isbn/${item.isbn}-M.jpg`} alt={item.name}
                                 style={{width: 100, height: 150}}/>
                            <h1>{item.name}</h1>
                            <h1>RATING :{item.rating}</h1>

                        </List.Item>
                    )}
                />
            </>
        )

    }

}


export default Top5List;