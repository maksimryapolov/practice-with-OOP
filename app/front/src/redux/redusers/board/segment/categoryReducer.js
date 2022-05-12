import {board} from "../../../../API/board/board";

const SET_CATEGORIES = 'board/segment/categoryReducer/SET_CATEGORIES';
const UPDATE_CATEGORIES = 'board/segment/categoryReducer/UPDATE_CATEGORIES';
const DELETE_CATEGORY = 'board/segment/categoryReducer/DELETE_CATEGORY';

const initialState = {
    categories: [],
};

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case(SET_CATEGORIES):
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
        case(DELETE_CATEGORY):
            return {
                ...state,
                categories: state.categories.filter((i, idx) => i.id !== action.category.id)
            };
        default:
            return state;
    }
}

export const setCategories = categories => ({type: SET_CATEGORIES, categories});
export const updateCategories = category => ({type: UPDATE_CATEGORIES, category});
export const deleteCategory = category => ({type: DELETE_CATEGORY, category});

export const addCategory = (params) => async dispatch => {
    const res = await board.addNewRecord(params);
    if(res.success.status) {
        dispatch(setCategories([{id: res.id, name: res.name, type_id: res.typeId}]))
    }
}
