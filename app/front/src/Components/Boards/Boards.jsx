import React from "react";
import { BoardsWrapper } from "./BoardsWrapper";
import { BoardsInfo } from "./BoardsInfo";
import { BoardsSelectDate } from "./BoardsSelectDate";

export const Boards = ({ typesAction, total, curDate, cards }) => {
    return (
        <>
            <BoardsSelectDate curDate={curDate} />
            <br/>
            <BoardsInfo typesAction={typesAction} total={total} />
            <BoardsWrapper cards={cards}/>
        </>
    );
}