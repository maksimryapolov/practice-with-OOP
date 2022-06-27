import React from "react";
import { BoardsWrapper } from "./BoardsWrapper";
import { BoardsInfo } from "./BoardsInfo";
import { BoardsSelectDate } from "./BoardsSelectDate";
import Pagination from "../Pagination/Pagination";

export const Boards = ({ typesAction, total, curDate, cards, activeType, setTab, setDate, pagination, handlerSetCurPage }) => {
    return (
        <>
            <BoardsSelectDate curDate={curDate} setDate={setDate} />
            <BoardsInfo typesAction={typesAction} total={total} activeType={activeType} setTab={setTab} />
            <BoardsWrapper cards={cards} />
            <Pagination pages={pagination.all} cur={pagination.cur} limit={pagination.limit} handlerSetCurPage={handlerSetCurPage} />
        </>
    );
}