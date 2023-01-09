import axiosInstance from "./axios.service";
import {setReviews} from "../redux/actions/actions";


const fetchNews = (id) => {
    return async (dispatch) => {
        const response = await axiosInstance.get(`/reviews/${id}`);
        console.log(response);
        dispatch(setReviews(response.data));
    }
}

const postNews = async (data) => {
    const response = await axiosInstance.post('/news', data);
    console.log(response);
    return response;
}

const fetchNewsTypes = async () =>{
    const response = await axiosInstance.get('/news/types');
    console.log(response);
    return response;
}

export {fetchNews, postNews, fetchNewsTypes};