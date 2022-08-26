import {Button} from "antd";
import axiosInstance from "../../util/axiosInstance";
import {useEffect, useState} from "react";
import BookService from "../../service/BookService";

const AddFavButton = (props) => {

    const bookService = new BookService();
    const url = `http://localhost:8080/api/v1/library/user/addfavlist/${sessionStorage.getItem("id")}/${props.bookId}`
    const [disabled, setDisabled] = useState(false);

    const getFavList = async () => {
        const favList = await bookService.fetchAllFavList();

        favList.forEach((book) => {
            if (book.id === props.bookId) {
                setDisabled(true);
            }
        })
    }

    useEffect(() => {
        getFavList()
    }, [props.refresh])


    const OnClick = () => {

        axiosInstance.post(url, null, {
            withCredentials: true,
        })
            .then(() => {
                alert("Book successfully added to Favourite Table.")
                props.update()
            })
            .catch(() => {
                alert("Book can not be added right now please try again")
            })

    }


    return (

        <Button type="primary" onClick={OnClick} disabled={disabled}>
            Add to Favorite List
        </Button>

    )

}
export default AddFavButton;