import React from "react";
import { BoardsWrapper } from "./BoardsWrapper";
import { BoardsInfo } from "./BoardsInfo";
import { BoardsSelectDate } from "./BoardsSelectDate";

export const Boards = ({ typesAction, total, curDate, cards, activeType, setTab }) => {
    return (
        <>
            <BoardsSelectDate curDate={curDate} />
            <BoardsInfo typesAction={typesAction} total={total} activeType={activeType} setTab={setTab} />
            <BoardsWrapper cards={cards}/>
        </>
    );
}