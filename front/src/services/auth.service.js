
import {getLoginUser, setAuth, setUserName} from "../redux/actions/actions";
import jwt_decode from "jwt-decode";
import {axiosInstance} from "./axios.service";

const login = (tokenId) => {
    return async (dispatch) => {
        const response = await axiosInstance.post('/users', {tokenId});

        localStorage.setItem('access_token', response.data.tokens.access_token);

        localStorage.setItem('button', 'true');

        dispatch(getLoginUser(response.data.user));

        dispatch(setUserName(response.data.user.name))

        return response.data
    }
};


const logout = (navigate) => {
    try {
        return async (dispatch) => {

            localStorage.setItem('button', 'false');

            localStorage.removeItem('access_token');

            navigate('/');

            dispatch(getLoginUser({}));

            return  await axiosInstance.post('/auth/logout', {withCredentials: true});
        }
    } catch (e) {
        console.log(e);
    }
};


const checkAuth = () => {
    try {
        return async (dispatch) => {
            const response = await axiosInstance.get('auth/refresh', {withCredentials: true});

            localStorage.setItem('access_token', response.data.tokens.access_token);

            dispatch(setAuth(true));

            dispatch(getLoginUser(response.data.user));

            return response;
        }
    } catch (e) {
        console.log(e);
    }
};

const decode = () => {
    const token = localStorage.getItem('access_token');
    return jwt_decode(token);
}

export {checkAuth, login, logout, decode};