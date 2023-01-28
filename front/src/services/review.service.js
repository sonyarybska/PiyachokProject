import {axiosInstance} from "./axios.service";


const fetchReviewsByEstablishmentId = async (id, page, limit, sort) => {
    const response = await axiosInstance.get(`/reviews/${id}`, {params: {page, limit, sort}});

    return response
}

const fetchRatingByEstablishmentId = async (id) => {
    const response = await axiosInstance.get(`/reviews/${id}/rating`);

    return response.data;
}

const fetchReviewsByUserId = async (id, page, limit) => {
    const response = await axiosInstance.get(`/reviews/users/${id}`, {
        params: {
            page,
            limit
        }
    }).catch(e => console.log(e.message));

    return response.data;
}

const postReview = async (data) => {
    const response = await axiosInstance.post('/reviews', data);

    return response;
}

const deleteReview = async (id) => {
    const response = await axiosInstance.delete(`/reviews/${id}`);

    return response;
}


export {fetchReviewsByEstablishmentId, postReview, fetchRatingByEstablishmentId, fetchReviewsByUserId, deleteReview};