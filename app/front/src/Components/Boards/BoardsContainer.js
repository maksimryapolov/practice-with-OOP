import React, {useEffect} from "react";
import { Boards } from "./Boards";
import {connect} from "react-redux";
import {getTypesAction, setCurDate, getCards, getAllPages, setCurPage} from "../../redux/redusers/board/boardReducer";
import {getTypes, getTotal, getCurMonth, getActiveType, getCards as getCardsSelector, getPagination} from "./selector";
import {setCurTab} from "../../redux/redusers/board/segment/recordTypeReducer";

const BoardsContainer = ({
     getTypesAction,
     typesAction,
     total,
     curDate,
     activeType,
     getCards,
     cards,
     setCurTab,
     setCurDate,
     pagination,
     getAllPages,
     setCurPage
}) => {
    useEffect(async () => {
        await getTypesAction();
    }, []);

    useEffect(async () => {
        await getAllPages(activeType);
    }, [activeType])

    useEffect(async () => {
        if(typesAction.length) {
            await setCurTab(typesAction[0].id)
        }
    }, [JSON.stringify(typesAction)]);

    useEffect( () => {
        if(activeType > 0) {
            const month = curDate.split('.')[0];
            const year = curDate.split('.')[1];
            getCards({ month, year, type: activeType, limit: pagination.limit, page: pagination.cur });
        }
    }, [activeType, curDate, pagination]);

    const setTab = (id) => {
        if(id) {
            setCurTab(id)
        }
    }

    const setDate = (date) => {
        setCurDate(date);
    }

    const handlerSetCurPage = num => {
        if(!isNaN(parseFloat(num)) && isFinite(num)) {
            setCurPage(num);
        }
    }

    return (
        <Boards
            typesAction={typesAction}
            total={total}
            curDate={curDate}
            cards={cards}
            activeType={activeType}
            setTab={setTab}
            setDate={setDate}
            pagination={pagination}
            handlerSetCurPage={handlerSetCurPage}
        />
    )
}

const mapStateToProps = (state) => {
    return {
        cards: getCardsSelector(state),
        total: getTotal(state),
        curDate: getCurMonth(state),
        typesAction: getTypes(state),
        activeType: getActiveType(state),
        pagination: getPagination(state)
    }
}

export default connect(mapStateToProps, {getTypesAction, getCards, setCurTab, setCurDate, getAllPages, setCurPage})(BoardsContainer);
