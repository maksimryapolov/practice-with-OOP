import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { cardsReduser } from "./redusers/cardsReduser";
import { usersReduser } from "./redusers/usersReduser";
import { authReducer } from "./redusers/authReducer";
import { appReducer } from "./redusers/appReducer";
import { registerReducer } from "./redusers/registerReducer";
import { addRecordReducer } from "./redusers/addRecordsReducer";
import { categoryReducer } from "./redusers/board/segment/categoryReducer";
import { accountReducer } from "./redusers/board/segment/accountReducer";
import { recordTypeReducer } from "./redusers/board/segment/recordTypeReducer";

let reducers = combineReducers({
    mainPage: cardsReduser,
    usersPage: usersReduser,
    authPage: authReducer,
    register: registerReducer,
    app: appReducer,
    addRecords: addRecordReducer,
    categoryBoard: categoryReducer,
    accountsBoard: accountReducer,
    typesBoard: recordTypeReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
