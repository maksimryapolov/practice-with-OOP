import {board} from "../../../API/board/board";
import date from "date-and-time";
import {setCurTab, setTypes} from "./segment/recordTypeReducer";

const ADD_BOARD = 'board/boardReducer/ADD_BOARD';
const SET_STATUS_ADDING = 'board/boardReducer/SET_STATUS_ADDING';
const SET_TYPES_ACTION = 'board/boardReducer/SET_TYPES_ACTION';
const SET_CUR_DATE = 'board/boardReducer/SET_CUR_DATE';
const SET_TOTAL = 'board/boardReducer/SET_TOTAL';

const initialState = {
    cards: [],
    typesAction: [],
    isAdding: false,
    total: 0,
    curDate: date.format(new Date(), "MM.YYYY"),
    activeType: 0
};

export const boardReducer = (state = initialState, action) => {
    switch (action.type) {
        case(ADD_BOARD):
            return {
                ...state,
                cards: action.board
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
        case(SET_CUR_DATE):
            return {
                ...state,
                curDate: action.date
            }
        case(SET_TOTAL):
            return {
                ...state,
                total: action.total
            }
        default:
            return state;
    }
}

export const addBoard = board => ({type: ADD_BOARD, board});
export const setStatusAdding = status => ({type: SET_STATUS_ADDING, status});
export const setTypesAction = types => ({type: SET_TYPES_ACTION, types});
export const setTotal = total => ({type: SET_TOTAL, total});

export const getTypesAction = () => async dispatch => {
    const res = await board.getTypes();
    if(res.success) {
        if(res.data && res.data[0].id > 0) {
            await dispatch(setCurTab(res.data[0].id))
        }
        dispatch(setTypes(res.data));
    }
}

export const creatBoard = (params) => async dispatch => {
    const res = await board.addBoard(params);
    if(res.success.status) {
        dispatch(setStatusAdding(true))
    }
}

export const getCards = params => async dispatch => {
    const res = await board.getCards(params);
    if(res.success) {
        dispatch(addBoard(res.data.elements));
        dispatch(setTotal(res.data.total));
    }
}

export const setCurDate = (date) => ({type: SET_CUR_DATE, date});