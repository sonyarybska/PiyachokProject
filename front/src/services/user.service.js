import axiosInstance from "./axios.service";
import {getUsers} from "../redux/actions/actions";


const fetchUsers = () => {
    return async (dispatch) => {
        const response = await axiosInstance.get('/users');
        dispatch(getUsers(response.data));
        return response.data
    }
};

const getUsersEstablishments = async (id) => {
    const response = await axiosInstance.get(`/users/${id}/establishments`);
    
    return response;
}
const fetchFavorite = async () => {
    const response = await axiosInstance.get(`/users/favorite`);

    return response.data;
}

const fetchFavoritesByUserId = async (user_id) => {
    const response = await axiosInstance.get(`/users/${user_id}/favorite`);

    return response;
}

const addUsersFavorite = async (user_id, establishment_id) => {
    const response = await axiosInstance.post(`/users/${user_id}/favorite`, {establishment_id});

    return response;
}

const deleteFavorite = async (user_id, establishment_id) => {
    const response = await axiosInstance.delete(`/users/${user_id}/favorite/${establishment_id}`);

    return response;
}

const getReviewsByUserId = async (id) => {
    const response = await axiosInstance.get(`/users/${id}/reviews`);

    return response.data;
}

export {fetchUsers, getUsersEstablishments, getReviewsByUserId, fetchFavorite, addUsersFavorite, deleteFavorite, fetchFavoritesByUserId};