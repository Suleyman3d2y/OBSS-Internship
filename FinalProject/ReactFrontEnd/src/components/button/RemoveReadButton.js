import {Button} from "antd";
import axiosInstance from "../../util/axiosInstance";

const RemoveReadButton = (props) => {

    const url = `http://localhost:8080/api/v1/library/user/removereadlist/${sessionStorage.getItem("id")}/${props.bookId}`

    const OnClick = () => {

        axiosInstance.delete(url,{
            withCredentials:true,
        })
            .then(() => {
                alert("Book succesfully removed from Favorite List")
                props.update()
            })
            .catch(() => {
                alert("Book can not be removed right now please try again.")
            })

    }


    return(

        <Button type="primary" onClick={OnClick}>
            Remove
        </Button>

    )

}
export default RemoveReadButton;