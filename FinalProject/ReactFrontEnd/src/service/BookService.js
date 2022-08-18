import axiosInstance from "../util/axiosInstance";

class BookService {

    fetchBookData = async (params) => {
        const response = await axiosInstance.get("http://localhost:8080/api/v1/library/books", {
            withCredentials: true,
            params: {
                pageSize: params.pagination.pageSize,
                pageNumber: params.pagination.current - 1
            }
        })

        if (!response) {
            return;
        }

        return response.data;
    };

    fetchAuthorData = async (params) => {
        const response = await axiosInstance.get("http://localhost:8080/api/v1/library/authors", {
            withCredentials: true,
            params: {
                pageSize: params.pagination.pageSize,
                pageNumber: params.pagination.current - 1,
            }
        })
            .catch((err) => {

                alert("You need to be an admin to see/edit Author table.")
                if (err.response.status === 500 && err.response.data === "Access is denied") {

                }
            })

        if (!response) {
            return;
        }
        return response.data;
    };

    fetchAllAuthorData = async () => {
        const response = await axiosInstance.get("http://localhost:8080/api/v1/library/all-authors", {
            withCredentials: true,

        })
            .catch((err) => {

                alert("You need to be an admin to see/edit Author table.")
                if (err.response.status === 500 && err.response.data === "Access is denied") {

                }
            })

        if (!response) {
            return;
        }
        return response.data;
    };

    fetchFavListData = async (params) => {
        const response = await axiosInstance.get(`http://localhost:8080/api/v1/library/favlist/${sessionStorage.getItem("id")}`,{
            withCredentials : true,
            params: {
                pageSize: params.pagination.pageSize,
                pageNumber: params.pagination.current-1,
            }
        })

        if (!response) {
            return;
        }

        return response.data;
    };

    fetchReadListData = async (params) => {
        const response = await axiosInstance.get(`http://localhost:8080/api/v1/library/readlist/${sessionStorage.getItem("id")}`,{
            withCredentials : true,
            params: {
                pageSize: params.pagination.pageSize,
                pageNumber: params.pagination.current-1,
            }
        })

        if (!response) {
            return;
        }

        return response.data;
    };

    fetchTop5Data = async () => {

        const response = await axiosInstance.get(`http://localhost:8080/api/v1/library/books/top5`,{
            withCredentials : true
        })

        if (!response) {
            return;
        }

        return response.data;
    };


}

export default BookService;
