import {createSelector} from "reselect";

export const getCategoryVal  = state => state.categoryBoard.categories;
export const getAccountVal  = state => state.accountsBoard.accounts;
export const getRecordTypeVal  = state => state.typesBoard.types;
export const getCurTab  = state =>  state.typesBoard.curTab;

export const getCurCategoryVal =  createSelector(
    getCategoryVal,
    getCurTab,
    (getCategoryVal, getCurTab) => {
        return getCategoryVal.filter(i => i.type_id === getCurTab)
    }
);