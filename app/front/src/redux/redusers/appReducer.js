import authenticate from "../../API/auth/authenticate";
import {checkAuth, setLoading, setUserData} from "./authReducer";

const SET_LOADER = 'appReducer/SET_LOADER';

const initialState = {
    loading: true
};

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADER:
            return {
                ...state,
                loading: action.loading
            }
        default:
            return state;
    }
}

export const setLoader = loading => ({type: SET_LOADER, loading})

export const setInitialData = () => async dispatch => {
    await dispatch(checkAuth());
    dispatch(setLoader(false));
};
