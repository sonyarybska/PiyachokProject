
import {setReviews} from "../redux/actions/actions";
import {axiosInstance} from "./axios.service";


const fetchNews = (id) => {
    return async (dispatch) => {
        const response = await axiosInstance.get(`/reviews/${id}`);

        dispatch(setReviews(response.data));
    }
}

const postNews = async (data) => {
    const response = await axiosInstance.post('/news', data);

    return response;
}

const fetchNewsTypes = async () =>{
    const response = await axiosInstance.get('/news/types');

    return response;
}

export {fetchNews, postNews, fetchNewsTypes};