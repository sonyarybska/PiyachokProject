import {GET_LOGIN_USER, GET_USERS, IS_AUTH_USER} from "../actions/actionTypes";

let initialState = {
    users: [],
    user: '',
    isAuth: false
}
export let userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS:
            return {...state, users: action.payload};
        case GET_LOGIN_USER:
            return {...state,user: action.payload};
        case IS_AUTH_USER:
            return {...state, isAuth: action.payload};
        default:
            return {...state}
    }
};