import React from "react";
import { BoardRowBody } from "./BoardRowBody";
import { BoardRowBodyLink } from "./BoardRowBodyLink";

export const BoardBody = ({ item }) => {
    const trClassName = "border-b border-gray-200 ";

    return (
        <tbody>
            <tr className={trClassName}>
                <BoardRowBody str={item.category_name} />
                <BoardRowBody str={item.account_name} />
                <BoardRowBody str={`${item.deposit_amount}  ₽`} />
                <BoardRowBodyLink id={item.id} />
            </tr>
        </tbody>
    );
}
