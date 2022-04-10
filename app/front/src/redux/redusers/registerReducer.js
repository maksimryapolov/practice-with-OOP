import authenticate from "../../API/auth/authenticate";

const SET_STATUS_REGISTER = 'registerReducer/SET_STATUS_REGISTER';
const SET_API_ERROR_MSG = 'registerReducer/SET_API_ERROR_MSG';

const initialState = {
    isRegister: false,
    errorsMsg: []
};

export const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_STATUS_REGISTER:
            return {
                ...state,
                isRegister: action.register
            }
        case SET_API_ERROR_MSG:
            return {
                ...state,
                errorsMsg: action.message
            }
        default:
            return state;
    }
}

export const setStatusRegister = register => ({type: SET_STATUS_REGISTER, register});
export const setErrorMessage = message => ({type: SET_API_ERROR_MSG, message});

export const sendRegisterData = data => async dispatch => {
    let res = await authenticate.register(data.login, data.email, data.password);

    if(res.RESULT && res.RESULT.id) {
        dispatch(setStatusRegister(true))
    } else if (res.ERROR) {
        dispatch(setErrorMessage(res.ERROR.MESSAGES))
    }
};
