import authenticate from "../../API/auth/authenticate";

const SET_USER = "authReducer/SET_USER_DATA";
const SET_LOADING = "authReducer/SET_LOADING";

const intialState = {
    user: {
        name: "",
        email: "",
    },
    isAuth: false,
    loading: false,
    txt: "123"
};

export const authReducer = (state = intialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: {
                    ...state.user,
                    email: action.data.email,
                    name: action.data.name,
                },
                isAuth: action.data.auth,
            };
        case SET_LOADING:
            return {
                ...state,
                loading: action.loading,
            };
        default:
            return state;
    }
};

export const setUserData = (data) => ({ type: SET_USER, data });
export const setLoading = (loading) => ({ type: SET_LOADING, loading });

export const sendAuthData = (login, password) => {
    return async (dispatch) => {
        let result = await authenticate.auth(login, password);
        dispatch(
            setUserData({
                email: result.user.email,
                name: result.user.username,
                auth: true
            })
        );
    };
};

export const logout = () => async dispatch => {
    let result = await authenticate.logout();
    dispatch(setUserData({
        email: "",
        name: "",
        auth: false
    }));
}

export const checkAuth = () => async dispatch => {
    let result = await authenticate.check();
    if(result) {
        dispatch(
            setUserData({
                email: result.user.email,
                name: result.user.username,
                auth: true
            })
        );
    }

    return result;
};
