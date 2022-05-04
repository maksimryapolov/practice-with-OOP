import {board} from "../../API/board/board";
import {deleteCategory, setCategories, updateCategories} from "./board/segment/categoryReducer";
import {deleteAccount, setAccounts, updateAccount} from "./board/segment/accountReducer";
import {setTypes} from "./board/segment/recordTypeReducer";

const SET_LOADING = 'addRecordReducer/SET_LOADING';

const initialState = {
    isLoading: true
};

export const addRecordReducer = (state = initialState, action) => {
    switch (action.type) {
        case(SET_LOADING):
            return {
                ...state,
                isLoading: action.isLoading
            }
        default:
            return state;
    }
}

export const setLoading =  isLoading => ({type: SET_LOADING, isLoading})

export const fetchFields = () => async dispatch => {
    const res = await board.getFields();

    dispatch(setCategories(res.category));
    dispatch(setAccounts(res.account));
    dispatch(setTypes(res.recordType));

}

export const updateRecord = params => async dispatch => {
    const res = await board.updateRecord(params);
    if(res.success.status) {
        switch (params.segment) {
            case "category":
                dispatch(updateCategories({id: res.id, name: res.name}))
                break;
            case "account":
                dispatch(updateAccount({id: res.id, name: res.name}))
                break;
        }

    }
}

export const deleteRecord = params => async dispatch => {
    const res = await board.deleteRecord(params);
    if(res.success.status) {
        switch (params.segment) {
            case "category":
                dispatch(deleteCategory({id: res.id, name: res.name}))
                break;
            case "account":
                dispatch(deleteAccount({id: res.id, name: res.name}))
                break;
        }

    }
}