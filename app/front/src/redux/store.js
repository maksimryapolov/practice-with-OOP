import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { cardsReduser } from "./redusers/cardsReduser";
import { usersReduser } from "./redusers/usersReduser";
import { authReducer } from "./redusers/authReducer";
import { appReducer } from "./redusers/appReducer";
import {registerReducer} from "./redusers/registerReducer";

let redusers = combineReducers({
    mainPage: cardsReduser,
    usersPage: usersReduser,
    authPage: authReducer,
    register: registerReducer,
    app: appReducer
});

let store = createStore(redusers, applyMiddleware(thunkMiddleware));

export default store;
