import axiosInstance from "../util/axiosInstance";


const UserService = (function () {

    const _fetchData = async (params) => {
        const response = await axiosInstance.get("http://localhost:8080/api/v1/users/",{
            withCredentials : true,
            params: {
                pageSize: params.pagination.pageSize,
                pageNumber: params.pagination.current-1,
            }
        })
            .catch((err) => {
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
