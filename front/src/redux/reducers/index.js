import {establishmentReducer} from "./establishment.reducer";
import {userReducer} from "./user.reducer";
import {reviewReducer} from "./review.reducer";
import {combineReducers} from "redux";

export let reducer = combineReducers({
    establishmentReducer,
    userReducer,
    reviewReducer
});