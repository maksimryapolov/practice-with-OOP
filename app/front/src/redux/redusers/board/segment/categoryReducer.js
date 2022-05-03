import {board} from "../../../../API/board/board";

const SET_CATEGORIES = 'board/segment/categoryReducer/SET_CATEGORIES';
const UPDATE_CATEGORIES = 'board/segment/categoryReducer/UPDATE_CATEGORIES';

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
        case(UPDATE_CATEGORIES):
            let result = state.categories.map((i) => {
                if(i.id === action.category.id)
                    return action.category;

                return i;
            });

            return {
                ...state,
                categories: result
            }
        default:
            return state;
    }
}

export const setCategories = categories => ({type: SET_CATEGORIES, categories});
export const updateCategories = category => ({type: UPDATE_CATEGORIES, category});

export const addCategory = (params) => async dispatch => {
    const res = await board.addNewRecord(params);
    if(res.success.status) {
        dispatch(setCategories([{id: res.id, name: res.name}]))
    }
}

/*
export const updateRecord = params => async dispatch => {
    const res = await board.updateRecord(params);
    if(res.success.status) {
        dispatch(updateCategories({id: res.id, name: res.name}))
    }
}
*/
