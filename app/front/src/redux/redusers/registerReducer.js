import authenticate from "../../API/auth/authenticate";

const SET_STATUS_REGISTER = 'registerReducer/SET_STATUS_REGISTER';

const initialState = {
    isRegister: false
};

export const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_STATUS_REGISTER:
            return {
                ...state,
                isRegister: action.register
            }
        default:
            return state;
    }
}

export const setStatusRegister = register => ({type: SET_STATUS_REGISTER, register});

export const sendRegisterData = data => async dispatch => {
    let res = await authenticate.register(data.login, data.email, data.password);

    if(res.RESULT && res.RESULT.id) {
        dispatch(setStatusRegister(true))
    }
};
