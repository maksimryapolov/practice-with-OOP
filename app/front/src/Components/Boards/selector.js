export const getTypes = state => state.typesBoard.types;
export const getTotal = state => state.board.total;
export const getCurMonth = state => state.board.curDate;
export const getActiveType = state => state.typesBoard.curTab;// state.board.activeType;
export const getCards = state => state.board.cards;