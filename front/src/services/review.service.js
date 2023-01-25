import {setReviews} from "../redux/actions/actions";
import {axiosInstance} from "./axios.service";


const fetchReviewsByEstablishmentId = (id) => {
    return async (dispatch) => {
        const response = await axiosInstance.get(`/reviews/${id}`, );

        dispatch(setReviews(response.data));
    }
}

const fetchRatingByEstablishmentId = async (id) => {
    const response = await axiosInstance.get(`/reviews/${id}/rating`);

    return response.data;
}

const fetchReviewsByUserId = async (id, page, limit) => {
    const response = await axiosInstance.get(`/reviews/users/${id}`,{params: {page, limit}}).catch(e => console.log(e.message));

    return response.data;
}

const postReview = async (data) => {
    const response = await axiosInstance.post('/reviews', data);

    return response;
}


export {fetchReviewsByEstablishmentId, postReview, fetchRatingByEstablishmentId, fetchReviewsByUserId};