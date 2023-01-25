import {
    GET_ONE_ESTABLISHMENTS,
} from "../actions/actionTypes";

let initialState = {
    one_establishment: {},
    users_establishments: [],
    admin_application: []
}

export let establishmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ONE_ESTABLISHMENTS:
            return {...state, one_establishment: action.payload};
        default:
            return {...state}
    }
}