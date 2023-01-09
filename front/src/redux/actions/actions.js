import {
    GET_USERS,
    GET_ESTABLISHMENTS,
    GET_ONE_ESTABLISHMENTS,
    GET_USERS_ESTABLISHMENTS,
    SET_SEARCH_VALUE,
    GET_LOGIN_USER,
    IS_AUTH_USER,
    ADMIN_APPLICATION,
    SET_REVIEWS
} from "./actionTypes";


const getUsers = (data) => {
    return {type: GET_USERS, payload: {...data}}
}

const getLoginUser = (data) => {
    return {type: GET_LOGIN_USER, payload: data}
}

const setAuth = (data) => {
    return {type: IS_AUTH_USER, payload:data}
}

const getEstablishments = (data) => {
    return {type: GET_ESTABLISHMENTS, payload: [...data]}
}

const getOneEstablishments = (data) => {
    return {type: GET_ONE_ESTABLISHMENTS, payload: {...data}}
}

const setUsersEstablishments = (data) => {
    return {type: GET_USERS_ESTABLISHMENTS, payload: [...data]}
}

const setValue = (data) => {
    return {type: SET_SEARCH_VALUE, payload: data}
}

const filterApplications = (data) => {
    return {type: ADMIN_APPLICATION, payload: [...data]}
}

const setReviews = (data) =>{
    return {type:SET_REVIEWS, payload: [...data]}
}

export {getUsers, getEstablishments, getOneEstablishments, setValue, getLoginUser, setAuth,
    filterApplications,setUsersEstablishments, setReviews};