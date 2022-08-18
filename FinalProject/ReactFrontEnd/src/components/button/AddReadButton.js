import {Button} from "antd";
import axiosInstance from "../../util/axiosInstance";

const AddReadButton = (props) => {

    const url = `http://localhost:8080/api/v1/library/user/addreadlist/${sessionStorage.getItem("id")}/${props.bookId}`

    const OnClick = () => {

        axiosInstance.post(url,null,{
            withCredentials:true,
        })
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