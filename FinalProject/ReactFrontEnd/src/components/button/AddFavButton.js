import {Button} from "antd";
import axiosInstance from "../../util/axiosInstance";

const AddFavButton = (props) => {

    const url = `http://localhost:8080/api/v1/library/user/addfavlist/${sessionStorage.getItem("id")}/${props.bookId}`

    const OnClick = () => {

        axiosInstance.post(url,null,{
            withCredentials:true,
        })
            .then((response) => {
                alert("Book successfully added to Favourite Table.")
            })
            .catch((err) => {
                alert("Book can not be added right now please try again")
            })

    }


    return(

        <Button type="primary" onClick={OnClick}>
            Add to Favorite List
        </Button>

    )

}
export default AddFavButton;