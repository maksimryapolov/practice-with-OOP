const SET_TYPES = 'board/segment/accountReducer/SET_TYPES';

const initialState = {
    types: [],
};

export const recordTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case(SET_TYPES):
            return {
                ...state,
                types: [...action.types]
            }
        default:
            return state;
    }
}

export const setTypes = types => ({type: SET_TYPES, types});
