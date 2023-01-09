import {
    GET_ESTABLISHMENTS, SET_SEARCH_VALUE,
    ADMIN_APPLICATION, GET_USERS_ESTABLISHMENTS, GET_ONE_ESTABLISHMENTS,
} from "../actions/actionTypes";

let initialState = {
    establishments: [],
    one_establishment: {},
    users_establishments: [],
    search_value: '',
    admin_application: []
}

export let establishmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ESTABLISHMENTS:
            return {...state, establishments: action.payload};
        case GET_ONE_ESTABLISHMENTS:
            return {...state, one_establishment: action.payload};
        case GET_USERS_ESTABLISHMENTS:
            return {...state, users_establishments: action.payload};
        case SET_SEARCH_VALUE:
            return {...state, search_value: action.payload};
        case ADMIN_APPLICATION:
            return {...state, admin_application: action.payload};
        default:
            return {...state}
    }
}