import React from "react";
import { BoardHead } from "./BoardHead";
import { BoardBody } from "./BoardBody"

export const BoardsTable = ({ cards }) => {
    return (
        <div className="overflow-hidden">
            {
                cards.map((i, key) => {
                    return (
                        <table className="min-w-full mb-10 border border-gray-200 shadow-lg shadow-gray-300/50" key={key}>
                            <BoardHead item={i} />
                            {
                                i.items.map((item) => {
                                    return (
                                        <BoardBody item={item} key={item.id}/>
                                    );
                                })
                            }
                        </table>
                    )
                })
            }
        </div>
    );
}