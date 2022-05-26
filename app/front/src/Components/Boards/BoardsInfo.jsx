import React from "react";

export const BoardsInfo = ({ typesAction, total}) => {
    return (
        <ul className="flex mb-5">
            { typesAction.map((i) => <li className="mr-5" key={i.id}>{i.name}</li>) }
            <li>Общая сумма: <span>{ total } ₽</span></li>
        </ul>
    );
}