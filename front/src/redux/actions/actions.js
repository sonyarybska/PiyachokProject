import {
    GET_USERS,
    GET_ONE_ESTABLISHMENTS,
    GET_LOGIN_USER,
    IS_AUTH_USER,
    SET_REVIEWS,
    SET_USER_NAME,
} from "./actionTypes";


const getUsers = (data) => {
    return {type: GET_USERS, payload: [...data]}
}

const getLoginUser = (data) => {
    return {type: GET_LOGIN_USER, payload: data}
}

const setAuth = (data) => {
    return {type: IS_AUTH_USER, payload:data}
}

const getOneEstablishments = (data) => {
    return {type: GET_ONE_ESTABLISHMENTS, payload: {...data}}
}

const setUserName = (name) => {
    return {type: SET_USER_NAME, payload: name}
}

const setReviews = (data) =>{
    return {type:SET_REVIEWS, payload: [...data]}
}

export {getUsers, getOneEstablishments, setUserName, getLoginUser, setAuth,
  setReviews};