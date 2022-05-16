import React from "react";

export const Boards = ({ typesAction, total }) => {
    return (
        <>
            <ul className="flex">
                { typesAction.map((i) => <li className="mr-5" key={i.id}>{i.name}</li>) }
                <li>Общая сумма: <span>{ total }</span></li>
            </ul>
        </>
    );
}