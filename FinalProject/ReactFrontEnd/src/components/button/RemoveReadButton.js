import {Button} from "antd";
import axios from "axios";

const RemoveReadButton = (props) => {

    const url = `http://localhost:8080/api/v1/library/user/removereadlist/${props.userId}/${props.bookId}`

    const OnClick = () => {

        axios.delete(url,{withCredentials:true})
            .then((response) => {
                alert("Book succesfully removed from Favorite List")
                window.location.reload();
            })
            .catch((err) => {
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