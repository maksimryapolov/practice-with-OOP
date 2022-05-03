import {board} from "../../../../API/board/board";

const SET_ACCOUNTS = 'board/segment/accountReducer/UPDATE_ACCOUNTS';
const UPDATE_ACCOUNTS = 'board/segment/accountReducer/SET_CATEGORIES';

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
        case(UPDATE_ACCOUNTS):
            let result = state.accounts.map((i) => {
                if(i.id === action.account.id)
                    return action.account;

                return i;
            });

            return {
                ...state,
                accounts: result
            }
        default:
            return state;
    }
}

export const setAccounts = accounts => ({type: SET_ACCOUNTS, accounts});
export const updateAccount = account => ({type: UPDATE_ACCOUNTS, account});


export const addAccount = (params) => async dispatch => {
    const res = await board.addNewRecord(params);
    if(res.success.status) {
        dispatch(setAccounts([{id: res.id, name: res.name}]))
    }
}
