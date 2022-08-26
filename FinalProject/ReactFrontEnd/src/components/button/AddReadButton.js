import {Button} from "antd";
import axiosInstance from "../../util/axiosInstance";
import {useEffect, useState} from "react";
import BookService from "../../service/BookService";

const AddReadButton = (props) => {

    const url = `http://localhost:8080/api/v1/library/user/addreadlist/${sessionStorage.getItem("id")}/${props.bookId}`
    const [disabled, setDisabled] = useState(false);
    const bookService = new BookService();


    const getReadList = async () => {
        const readList = await bookService.fetchAllReadList();

        readList.forEach((book) => {
            if (book.id === props.bookId) {
                setDisabled(true);
            }
        })
    }

    useEffect(() => {
        getReadList()
    }, [props.refresh])

    const OnClick = () => {

        axiosInstance.post(url, null, {
            withCredentials: true,
        })
            .then(() => {
                alert("Book successfully added to Read Table.")
                props.update()
            })
            .catch(() => {
                alert("Book can not be added right now please try again")
            })

    }

    return (

        <Button type="primary" onClick={OnClick} disabled={disabled}>
            Add to Read List
        </Button>

    )

}
export default AddReadButton;