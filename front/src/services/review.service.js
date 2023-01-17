import axiosInstance from "./axios.service";
import {setReviews} from "../redux/actions/actions";


const fetchReviewsByEstablishmentId = (id) => {
    return async (dispatch) => {
        const response = await axiosInstance.get(`/reviews/${id}`);

        dispatch(setReviews(response.data));
    }
}

const fetchRatingByEstablishmentId = async (id) => {
    const response = await axiosInstance.get(`/reviews/${id}/rating`);

    return response.data;
}


const postReview = async (data) => {
    const response = await axiosInstance.post('/reviews', data);

    return response;
}


export {fetchReviewsByEstablishmentId, postReview, fetchRatingByEstablishmentId};