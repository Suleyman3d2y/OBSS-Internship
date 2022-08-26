import React, {useEffect, useState} from "react";
import {Option} from "antd/es/mentions";
import BookService from "../service/BookService";


const AuthorUtil = () => {

    const [authorOptions, setAuthorOptions] = useState([]);
    const bookService = new BookService();

    const getAllAuthorData = async () => {
        const authorData = await bookService.fetchAllAuthorData()
        const options = [];
        authorData.forEach((author) => {
            options.push(<Option key={author.name}>{author.name}</Option>)
        })
        setAuthorOptions(options);

    }
    useEffect(() => {
        getAllAuthorData()
    }, [])

    return ({
        authorOptions: authorOptions
    })

}
export default AuthorUtil