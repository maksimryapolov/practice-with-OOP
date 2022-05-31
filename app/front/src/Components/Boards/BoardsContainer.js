import React, {useEffect} from "react";
import { Boards } from "./Boards";
import {connect} from "react-redux";
import {getTypesAction, setCurDate, getCards} from "../../redux/redusers/board/boardReducer";
import {getTypes, getTotal, getCurMonth, getActiveType, getCards as getCardsSelector} from "./selector";
import {setCurTab} from "../../redux/redusers/board/segment/recordTypeReducer";

const BoardsContainer = ({ getTypesAction, typesAction, total, curDate, activeType, getCards, cards, setCurTab }) => {
    useEffect(async () => {
        await getTypesAction();
    }, []);

    useEffect(async () => {
        if(typesAction.length) {
            await setCurTab(typesAction[0].id)
        }
    }, [JSON.stringify(typesAction)]);

    useEffect( () => {
        if(activeType > 0) {
            const month = curDate.split('.')[0];
            const year = curDate.split('.')[1];
            getCards({month, year, type: activeType});
        }
    }, [activeType]);

    const setTab = (id) => {
        if(id) {
            setCurTab(id)
        }
    }

    const setDate = (date) => {
        setCurDate(date);
    }

    return (
        <Boards
            typesAction={typesAction}
            total={total}
            curDate={curDate}
            cards={cards}
            activeType={activeType}
            setTab={setTab}
        />
    )
}

const mapStateToProps = (state) => {
    return {
        cards: getCardsSelector(state),
        total: getTotal(state),
        curDate: getCurMonth(state),
        typesAction: getTypes(state),
        activeType: getActiveType(state)
    }
}

export default connect(mapStateToProps, {getTypesAction, getCards, setCurTab})(BoardsContainer);
