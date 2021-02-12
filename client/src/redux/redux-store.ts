import {applyMiddleware, combineReducers, createStore} from "redux";
import {portfolioReducer} from "./portfolio/reducer";
import thunkMiddleware from "redux-thunk"
import {authReducer} from "./auth/reducer";
import {connectReducer} from "./connects/reducer";

const reducers =combineReducers({
    portfolio: portfolioReducer,
    auth: authReducer,
    connect: connectReducer
})

export type RootState = ReturnType<typeof reducers>

let store = createStore(reducers, applyMiddleware(thunkMiddleware))

export default store