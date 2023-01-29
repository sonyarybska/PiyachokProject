import {axiosInstance} from "./axios.service";


const fetchEstablishments = async (page, limit, title, sort, type, filterByRating, filterByCheck,pending,approved,rejected) => {
    const response = await axiosInstance.get(`/establishments`, {
        params: {
            page,
            limit,
            title,
            sort,
            type,
            filterByRating,
            filterByCheck,
            pending,
            approved,
            rejected
        }
    });

    return response;
}

const fetchOneEstablishment = async (id) => {
    const response = await axiosInstance.get(`/establishments/${id}`);

    return response;
}

const postEstablishments = async (data) => {
    const response = (await axiosInstance.post('/establishments', data).catch(err => err.response));

    return response.data.message ? alert(response.data.message) : response;
};

const putEstablishments = async (data, id) => {
    const response = await axiosInstance.put(`/establishments/${id}`, data).catch(err => err.response);
    console.log(response);
    return response.data.message ? alert(response.data.message) : response;
};

const patchEstablishments = async (data, id) => {
    const response = await axiosInstance.patch(`/establishments/${id}`, data).catch(err => err.response);

    return response;
};

const deleteEstablishment = async (id) => {
    const response = await axiosInstance.delete(`/establishments/${id}`);
    return response;
}

const getTypeEstablishments = async () => {
    const response = await axiosInstance.get(`/establishments/type`).catch(e=> console.log(e));

    return response;
}

const getEstablishmentsByUserId = async (id, page, limit, approved, rejected, pending) => {
    const response = await axiosInstance.get(`/establishments/users/${id}`, {
        params: {
            page,
            limit,
            approved,
            rejected,
            pending
        }
    });

    return response;
}

export {
    fetchEstablishments,
    postEstablishments,
    putEstablishments,
    patchEstablishments,
    getTypeEstablishments,
    fetchOneEstablishment,
    deleteEstablishment,
    getEstablishmentsByUserId,
};