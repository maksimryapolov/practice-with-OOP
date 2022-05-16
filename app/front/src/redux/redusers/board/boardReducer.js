import {board} from "../../../API/board/board";

const ADD_BOARD = 'board/boardReducer/ADD_BOARD';
const SET_STATUS_ADDING = 'board/boardReducer/SET_STATUS_ADDING';
const SET_TYPES_ACTION = 'board/boardReducer/SET_TYPES_ACTION';

const initialState = {
    cards: [],
    typesAction: [],
    isAdding: false,
    total: 0
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
        case(SET_TYPES_ACTION):
            return {
                ...state,
                typesAction: action.types
            }
        default:
            return state;
    }
}

export const addBoard = board => ({type: ADD_BOARD, board});
export const setStatusAdding = status => ({type: SET_STATUS_ADDING, status});
export const setTypesAction = types => ({type: SET_TYPES_ACTION, types});

export const getTypesAction = () => async dispatch => {
    const res = await board.getTypes();
    if(res.success) {
        dispatch(setTypesAction(res.data))
    }
}

export const creatBoard = (params) => async dispatch => {
    const res = await board.addBoard(params);
    if(res.success.status) {
        dispatch(setStatusAdding(true))
    }
}
