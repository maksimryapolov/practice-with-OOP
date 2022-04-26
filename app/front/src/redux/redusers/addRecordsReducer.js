import {board} from "../../API/board/board";
import {setCategories} from "./board/segment/categoryReducer";
import {setAccounts} from "./board/segment/accountReducer";
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