import axios from "axios";

const UserService = (function () {

    const _fetchData = async (params) => {
        const response = await axios.get("http://localhost:8080/api/v1/users/",{
            withCredentials : true,
            params: {
                pageSize: params.pagination.pageSize,
                pageNumber: params.pagination.current-1,
            }
        })
            .catch((err) => {
                console.log(err.response.data)
                alert("You need to be an admin to see/edit Admin table.")
                if(err.response.status === 500 && err.response.data === "Access is denied"){

                }
            })

        if (!response) {
            return;
        }
        return response.data;
    };

    return {
        fetchData: _fetchData
    };
})();

export default UserService;
