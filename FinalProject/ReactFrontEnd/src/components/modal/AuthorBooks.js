import {Button, Input, Modal, Space, Table} from "antd";
import {SearchOutlined} from "@ant-design/icons"
import EditBook from "../modal/EditBook";
import AddFavButton from "../button/AddFavButton";
import AddReadButton from "../button/AddReadButton";
import React, {useState} from "react";
import axiosInstance from "../../util/axiosInstance";
import useRender from "../../util/useRender";


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
            <Space direction="vertical" size="small">
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


function AuthorBooks(props) {

    const [visible, setVisible] = useState(false);
    const [data, setData] = useState();
    //TODO add pagination
    /*const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10
    })*/

    /*const handleTableChange = (newPagination) => {
        setPagination(newPagination);
        axiosInstance.get(`http://localhost:8080/api/v1/library/author-books/${props.authorName}`, {
            withCredentials: true,
            params: {
                pageSize: pagination.pageSize,
                pageNumber: pagination.current - 1,
            }
        })
            .then((response) => {
                setData(response.data);

                setVisible(true);
            })
    };*/
    const CreateTable = (props) => {

        return (
            <Modal
                width={1500}
                title="Author Books"
                visible={visible}
                onCancel={() => setVisible(false)}
                onOk={() => setVisible(false)}
                footer={[
                    <Button key="back" onClick={() => setVisible(false)}>
                        Cancel
                    </Button>,
                ]}
            >
                <Table
                    dataSource={props.dataSource}
                    columns={columns}
                    /*pagination={pagination}
                    onChange={handleTableChange}*/
                />

            </Modal>
        )

    }

    function submit() {

        axiosInstance.get(`http://localhost:8080/api/v1/library/author-books/${props.authorName}`, {
            withCredentials: true,
            /*params: {
                pageSize: pagination.pageSize,
                pageNumber: pagination.current - 1,
            }*/
        })
            .then((response) => {
                setData(response.data);

                setVisible(true);
            })

    }

    return (
        <div align="left">
            <Space>
                <Button type="primary" htmlType="submit" icon={<SearchOutlined/>} onClick={submit}>
                    See Books
                </Button>
                <CreateTable dataSource={data}/>
            </Space>
        </div>
    );
}

export default AuthorBooks;

