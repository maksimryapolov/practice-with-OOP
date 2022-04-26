import {board} from "../../../../API/board/board";

const SET_ACCOUNTS = 'board/segment/accountReducer/SET_CATEGORIES';

const initialState = {
    accounts: [],
};

export const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case(SET_ACCOUNTS):
            return {
                ...state,
                accounts: [...state.accounts, ...action.accounts]
            }
        default:
            return state;
    }
}

export const setAccounts = accounts => ({type: SET_ACCOUNTS, accounts});
export const addAccount = (params) => async dispatch => {
    const res = await board.addNewRecord(params);
    if(res.success.status) {
        dispatch(setAccounts([{id: res.id, name: res.name}]))
    }
}