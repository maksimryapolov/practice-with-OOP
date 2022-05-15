import {board} from "../../../API/board/board";

const ADD_BOARD = 'board/boardReducer/ADD_BOARD';
const SET_STATUS_ADDING = 'board/boardReducer/SET_STATUS_ADDING';

const initialState = {
    cards: [],
    isAdding: false
};

export const boardReducer = (state = initialState, action) => {
    switch (action.type) {
        case(ADD_BOARD):
            return {
                ...state,
            }
        case(SET_STATUS_ADDING):
            return {
                ...state,
                isAdding: action.status
            }
        default:
            return state;
    }
}

export const addBoard = board => ({type: ADD_BOARD, board});
export const setStatusAdding = status => ({type: SET_STATUS_ADDING, status});

export const creatBoard = (params) => async dispatch => {
    const res = await board.addBoard(params);
    if(res.success.status) {
        dispatch(setStatusAdding(true))
    }
}
