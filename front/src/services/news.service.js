import {axiosInstance} from "./axios.service";

const fetchNews = async (id) => {
    const response = await axiosInstance.get(`/news`);

    return response
}

const postNews = async (data) => {
    const response = await axiosInstance.post('/news', data);

    return response;
}

const fetchNewsTypes = async () => {
    const response = await axiosInstance.get('/news/types');

    return response;
}

export {fetchNews, postNews, fetchNewsTypes};