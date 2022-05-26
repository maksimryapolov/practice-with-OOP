import React, {useEffect} from "react";
import { Boards } from "./Boards";
import {connect} from "react-redux";
import {getTypesAction, setCurDate, getCards} from "../../redux/redusers/board/boardReducer";
import {getTypes, getTotal, getCurMonth, getActiveType, getCards as getCardsSelector} from "./selector";

const BoardsContainer = ({ getTypesAction, typesAction, total, curDate, activeType, getCards, cards }) => {
    useEffect(async () => {
        await getTypesAction();
    }, []);

    useEffect( () => {
        if(activeType > 0) {
            const month = curDate.split('.')[0];
            const year = curDate.split('.')[1];
            getCards({month, year, type: activeType});
        }
    }, [activeType]);

    const setDate = (date) => {
        setCurDate(date);
    }

    return (
        <Boards
            typesAction={typesAction}
            total={total}
            curDate={curDate}
            cards={cards}
        />
    )
}

const mapStateToProps = (state) => {
    return {
        cards: getCardsSelector(state),
        typesAction: getTypes(state),
        total: getTotal(state),
        curDate: getCurMonth(state),
        activeType: getActiveType(state)
    }
}

export default connect(mapStateToProps, {getTypesAction, getCards})(BoardsContainer);
