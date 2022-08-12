import {Button} from "antd";
import axios from "axios";

const AddReadButton = (props) => {

    const url = `http://localhost:8080/api/v1/library/user/addreadlist/${props.userId}/${props.bookId}`

    const OnClick = () => {

        axios.post(url,null,{withCredentials:true})
            .then((response) => {
                alert("Book successfully added to Read Table.")
            })
            .catch((err) => {
                alert("Book can not be added right now please try again")
            })

    }


    return(

        <Button type="primary" onClick={OnClick}>
            Add to Read List
        </Button>

    )

}
export default AddReadButton;