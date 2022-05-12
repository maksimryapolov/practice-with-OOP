const SET_TYPES = 'board/segment/accountReducer/SET_TYPES';
const SET_CURRENT_TAB = 'board/segment/accountReducer/SET_CURRENT_TAB';

const initialState = {
    types: [],
    curTab: 0
};

export const recordTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case(SET_TYPES):
            return {
                ...state,
                types: [...action.types]
            }
        case (SET_CURRENT_TAB):
            return {
                ...state,
                curTab: action.tabId
            }
        default:
            return state;
    }
}

export const setTypes = types => ({type: SET_TYPES, types});
export const setCurTab = tabId => ({type: SET_CURRENT_TAB, tabId});