import axios from "axios";
import {axiosInstance} from "../../services/axios.service";
import {useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";

export function ResponseInterceptor() {
    const navigate = useNavigate();

    const interceptorId = useRef(null);

    useEffect(() => {
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
                    console.log(e)
                }
            } else if (error?.response?.status === 403) {
                navigate(`${window.location.pathname}`,{state:{loginRequest:true}});
                return true;
            }
            throw error;
        })
        return () => {
            axiosInstance.interceptors.response.eject(interceptorId.current);
        };
    }, []);

    axiosInstance.interceptors.request.use((config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = localStorage.getItem('access_token');
        }
        return config;
    });


   return null;
}
