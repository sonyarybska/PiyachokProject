import axiosInstance from "./axios.service";

const fetchEstablishments = async (page, limit, title, sort, type, filterByRating,filterByCheck) => {
    const response = await axiosInstance.get(`/establishments`, {params: {page, limit, title, sort, type, filterByRating,filterByCheck}});

    return response;
}

const fetchOneEstablishment = async (id) => {
    const response = await axiosInstance.get(`/establishments/${id}`);
    return response;
}

const postEstablishments = async (data) => {
    const response = await axiosInstance.post('/establishments', data);

    return response;
};

const getFilesEstablishments = async (id, user_id) => {
    const response = await axiosInstance.get(`/establishments/files/${id}/${user_id}`);

    return response;
}

const updateEstablishments = async (data, id) => {
    const result = await axiosInstance.put(`/establishments/${id}`, data);

    return result.data;
};

const deleteEstablishment = async (id) => {
    const response = await axiosInstance.delete(`/establishments/${id}`);
    return response;
}

const getTypeEstablishments = async () => {
    const response = await axiosInstance.get(`/establishments/type`);
    return response;
}


export {
    fetchEstablishments,
    postEstablishments,
    updateEstablishments,
    getTypeEstablishments,
    fetchOneEstablishment,
    deleteEstablishment,
    getFilesEstablishments
};