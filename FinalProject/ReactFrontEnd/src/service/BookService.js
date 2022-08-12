import axios from "axios";

class BookService {

    fetchBookData = async (params) => {
        const response = await axios.get("http://localhost:8080/api/v1/library/books", {
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
        const response = await axios.get("http://localhost:8080/api/v1/library/authors", {
            withCredentials: true,
            params: {
                pageSize: params.pagination.pageSize,
                pageNumber: params.pagination.current - 1,
            }
        })
            .catch((err) => {
                console.log(err.response.data)
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
        const response = await axios.get(`http://localhost:8080/api/v1/library/favlist/${params.id}`,{
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
        const response = await axios.get(`http://localhost:8080/api/v1/library/readlist/${params.id}`,{
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
        const response = await axios.get(`http://localhost:8080/api/v1/library/books/top5`,{
            withCredentials : true,

        })

        if (!response) {
            return;
        }

        return response.data;
    };


}

export default BookService;
