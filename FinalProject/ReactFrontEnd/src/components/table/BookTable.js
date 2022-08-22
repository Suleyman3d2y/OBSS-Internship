import React from "react";
import {Input, Space} from 'antd';
import BookService from "../../service/BookService";
import EditBook from "../modal/EditBook";
import TableComponent from "./TableComponent";
import AddFavButton from "../button/AddFavButton";
import AddReadButton from "../button/AddReadButton";
import {SearchOutlined} from "@ant-design/icons"
import useRender from "../../util/useRender";

const bookservice = new BookService();

const genres = ["Art", "Biography", "Business", "Chick Lit", "Children's", "Christian", "Classics",
    "Comics", "Contemporary", "Cookbooks", "Crime", "Ebooks", "Fantasy", "Fiction",
    "Gay and Lesbian", "Graphic Novels", "Historical Fiction", "History", "Horror",
    "Humor and Comedy", "Manga", "Memoir", "Music", "Mystery", "Nonfiction", "Paranormal",
    "Philosophy", "Poetry", "Psychology", "Religion", "Romance", "Science", "Science Fiction",
    "Self Help", "Suspense", "Spirituality", "Sports", "Thriller", "Travel", "Young Adult"]

const genreFilters = genres.map((genre) => {
    return {text: genre, value: genre}
})

const Filter = (genres,value) => {
    let contains = false;
    genres.map((genre) => {
        if(genre.name.indexOf(value) === 0){
            return contains = true;
        }
        return contains;
    })
    return contains;
}

const columns = [

    {
        title: "Id",
        dataIndex: "id",
    },
    {
        title: "Name",
        dataIndex: "name",
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm}) => {
            return (
                <Input
                    autoFocus
                    value={selectedKeys[0]}
                    onChange={(e) => {
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }}
                    onPressEnter={() => {
                        confirm()
                    }}
                    onBlur={() => {
                        confirm()
                    }}
                ></Input>)
        },
        filterIcon: () => {
            return <SearchOutlined/>
        },
        onFilter: (value, record) => {
            return record.name.toLowerCase().includes(value.toLowerCase())
        }
    },
    {
        title: "Genre",
        dataIndex: "genres",
        render: (genres) => genres.map((genre) => {
            return `${genre.name}\n`
        }),
        filters: genreFilters,
        onFilter: (value, record) => Filter(record.genres,value)
    },
    {
        title: "Page Count",
        dataIndex: "pageCount",
        sorter: (a, b) => a.pageCount - b.pageCount
    },
    {
        title: "Rating",
        dataIndex: "rating",
        sorter: (a, b) => a.rating - b.rating
    },
    {
        title: "ISBN",
        dataIndex: "isbn"
    },

    {
        title: "Author",
        dataIndex: "author",
        render: (author) => `${author.name}`,
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm}) => {
            return (
                <Input
                    autoFocus
                    value={selectedKeys[0]}
                    onChange={(e) => {
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }}
                    onPressEnter={() => {
                        confirm()
                    }}
                    onBlur={() => {
                        confirm()
                    }}
                ></Input>)
        },
        filterIcon: () => {
            return <SearchOutlined/>
        },
        onFilter: (value, record) => {
            return record.name.toLowerCase().includes(value.toLowerCase())
        }
    },
    {
        title: "Active",
        dataIndex: "active",
        render: (record) => String(record),
        sorter: (a, b) => a.active - b.active
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space direction="vertical" size="small" >
                <EditBook id={record.id} name={record.name} genre={record.genre} pageCount={record.pageCount}
                          rating={record.rating} authorName={record.author.name} render={useRender}/>

                <AddFavButton bookId={record.id}/>

                <AddReadButton bookId={record.id}/>

                <a href={`https://www.goodreads.com/book/isbn/${record.isbn}`} target="_blank"
                   rel="noopener noreferrer">See reviews</a>
                <a href={`https://www.amazon.com/gp/product/${record.isbn}`} target="_blank"
                   rel="noopener noreferrer">Buy on Amazon</a>
            </Space>

        ),
    },

];



class BookTable extends React.Component {
    state = {
        data: [],
        pagination: {
            current: 1,
            pageSize: 10
        },
        loading: false
    };

    componentDidMount() {

        const {pagination} = this.state;
        this.fetch({pagination}, []);
    }

    handleTableChange = (newPagination) => {
        this.fetch({
            pagination: newPagination
        });
    };
    fetch = async (params = {}) => {
        this.setState({loading: true});

        const data = await bookservice.fetchBookData(params);
        this.setState({
            loading: false,
            data: data && data.content,
            pagination: {
                ...params.pagination,
                total: this.state.pagination.pageSize * data.totalPages
            }
        });
    };

    render() {
        const {data, pagination, loading} = this.state;

        return (
            <TableComponent
                columns={columns}
                dataSource={data}
                pagination={pagination}
                loading={loading}
                handleTableChange={this.handleTableChange}
                name={"Book Table"}
                render={useRender}
            />
        );
    }
}

export default BookTable;
