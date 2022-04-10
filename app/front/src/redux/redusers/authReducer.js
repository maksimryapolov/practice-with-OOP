import authenticate from "../../API/auth/authenticate";

const SET_USER = "authReducer/SET_USER_DATA";
const SET_LOADING = "authReducer/SET_LOADING";
const SET_ERRORS_API = "authReducer/SET_ERRORS_API";

const intialState = {
    user: {
        name: "",
        email: "",
    },
    isAuth: false,
    loading: false,
    errorsMsg: [],
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
        case SET_ERRORS_API:
            return {
                ...state,
                errorsMsg: action.error
            }
        default:
            return state;
    }
};

export const setUserData = (data) => ({ type: SET_USER, data });
export const setLoading = (loading) => ({ type: SET_LOADING, loading });

const setErrorsApi = error => ({ type: SET_ERRORS_API, error});

export const sendAuthData = (login, password) => {
    return async (dispatch) => {
        let res = await authenticate.auth(login, password);

        if(res.RESULT) {
            dispatch(
                setUserData({
                    email: res.user.email,
                    name: res.user.username,
                    auth: true
                })
            );
        } else if(res.error) {
            dispatch(setErrorsApi(res.error.message));
        }
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
