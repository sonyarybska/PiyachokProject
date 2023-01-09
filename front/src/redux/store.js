import {createStore} from "redux";
import {reducer} from "./reducers/index";
import {applyMiddleware} from "redux";
import ReduxThunk from 'redux-thunk'

export let store = createStore(reducer, applyMiddleware(ReduxThunk));