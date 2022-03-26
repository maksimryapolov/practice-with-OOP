import usersApi from "../../API/usersAPI";

const SET_USERS_LIST = "SET_USERS_LIST";
const SET_CURRENT_PAGET = "SET_CURRENT_PAGET";
const SET_COUNT_ALL_PAGET = "SET_COUNT_ALL_PAGET";
const SET_LOADING = "SET_LOADING";

let initalState = {
    users: [],
    isLoading: true,
    isAuth: true,
    pagination: {
        current: 1,
        limit: 3,
        all: 0,
    },
};

export let usersReduser = (state = initalState, action) => {
    switch (action.type) {
        case SET_USERS_LIST:
            return {
                ...state,
                users: [...action.users],
            };
        case SET_CURRENT_PAGET:
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    current: action.number,
                },
            };
        case SET_COUNT_ALL_PAGET:
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    all: action.number,
                },
            };
        case SET_LOADING:
            return {
                ...state,
                isLoading: action.flag,
            };
        default:
            return state;
    }
};

export let setUsersList = (users) => ({ type: SET_USERS_LIST, users });
export let setCurPage = (number) => ({ type: SET_CURRENT_PAGET, number });
export let setCountAllPage = (number) => ({
    type: SET_COUNT_ALL_PAGET,
    number,
});
export let setLoading = (flag) => ({ type: SET_LOADING, flag });

export let setUsersApi = (limit, current, isSetAllPage, isLoading) => {
    return (dispatch) => {
        let promise = usersApi.getUsers(limit, current).then((res) => {
            if (res.data && res.data.length) {
                if (isSetAllPage) {
                    dispatch(setCountAllPage(res.countRecords));
                }

                dispatch(setUsersList(res.data));
                dispatch(setLoading(!isLoading));
            }
        });

        // Для инициализации приложения
        // Promise.all([promise]).then((data) => {});
    };
};
