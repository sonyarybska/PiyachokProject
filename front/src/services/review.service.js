import axiosInstance from "./axios.service";
import {setReviews} from "../redux/actions/actions";


const fetchReviews = (id) => {
    return async (dispatch) => {
        const response = await axiosInstance.get(`/reviews/${id}`);
        console.log(response);
        dispatch(setReviews(response.data));
    }
}

const postReview = async (data) => {
    const response = await axiosInstance.post('/reviews', data);
    console.log(response);
    return response;
}


export {fetchReviews, postReview};