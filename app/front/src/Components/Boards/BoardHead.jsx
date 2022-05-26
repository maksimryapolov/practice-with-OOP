import React from "react";
import { BoardRowHead } from "./BoardRowHead";

export const BoardHead = ({ item }) => {
    const headClassName = "border-b border-gray-200";

    return (
        <thead className={headClassName}>
            <tr>
                <BoardRowHead str={`Дата: ${item.date}`}/>
                <BoardRowHead str={`Аккаунт:`}/>
                <BoardRowHead str={`Сумма: ${item.sum} ₽`}/>
            </tr>
        </thead>
    );
}