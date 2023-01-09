import axios from "axios";

let axiosInstance = axios.create({
    baseURL: 'http://localhost:4000',
    withCredentials: true,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
});

axiosInstance.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error?.response?.status === 401) {
        try {
            const response = await axios.get('http://localhost:4000/auth/refresh', {withCredentials: true});
            localStorage.setItem('access_token', response.data.tokens.access_token);
            return axiosInstance.request(originalRequest);
        } catch (e) {
            console.log(e);
            console.log('No authorized');
        }
    }
    throw error;
});

axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem('access_token');
    return config;
});



export default axiosInstance;