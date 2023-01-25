import {GET_LOGIN_USER, GET_USERS, IS_AUTH_USER, SET_USER_NAME} from "../actions/actionTypes";

let initialState = {
    users: [],
    user: '',
    isAuth: false,
    username: ''
}

export let userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS:
            return {...state, users: action.payload};
        case GET_LOGIN_USER:
            return {...state, user: action.payload};
        case SET_USER_NAME:
            return {...state, user: {...state.user, name: action.payload}};
        case IS_AUTH_USER:
            return {...state, isAuth: action.payload};
        default:
            return {...state}
    }
};