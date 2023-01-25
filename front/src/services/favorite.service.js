import {axiosInstance} from "./axios.service";


const fetchFavorite = async () => {
    const response = await axiosInstance.get(`/favorite`);

    return response.data;
}

const fetchFavoritesByUserId = async (user_id, page, limit) => {
    const response = await axiosInstance.get(`/favorite/${user_id}`, {params: {page, limit}});

    return response;
}

const addUsersFavorite = async (user_id, establishment_id) => {
    const response = await axiosInstance.post(`/favorite/${user_id}`, {establishment_id});

    return response;
}

const deleteFavorite = async (user_id, establishment_id) => {
    const response = await axiosInstance.delete(`/favorite/${user_id}/${establishment_id}`);

    return response;
}

export {
    fetchFavorite,
    fetchFavoritesByUserId,
    addUsersFavorite,
    deleteFavorite
}