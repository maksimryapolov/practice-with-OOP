import {board} from "../../../../API/board/board";

const SET_CATEGORIES = 'board/segment/categoryReducer/SET_CATEGORIES';

const initialState = {
    categories: [],
};

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case(SET_CATEGORIES):
            console.log(action.categories);
            return {
                ...state,
                categories: [...state.categories, ...action.categories]
            }
        default:
            return state;
    }
}

export const setCategories = categories => ({type: SET_CATEGORIES, categories});
export const addCategory = (params) => async dispatch => {
    const res = await board.addNewRecord(params);
    if(res.success.status) {
        dispatch(setCategories([{id: res.id, name: res.name}]))
    }
}
