import {createSelector} from "reselect";

/* SELECTORS */
export const statusAuth = state => state.authPage.isAuth;
export const userData = state => state.authPage.user;
export const loading = state => state.authPage.loading;
export const getErrorsMsg = state => state.authPage.errorsMsg
const getTxt = state => state.authPage.txt;
/* ! END SELECTORS */

// export const exampleAuth =  createSelector(getTxt, txt => txt + "213");