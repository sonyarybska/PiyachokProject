import {
    SET_REVIEWS
} from "../actions/actionTypes";

let initialState = {
    reviews: [],
}

export let reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_REVIEWS:
            return {...state, reviews: action.payload};
        default:
            return {...state}
    }
}