import React from "react";
import { BoardsTable } from "./BoardsTable";

export const BoardsWrapper = ({ cards }) => {
    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <BoardsTable cards={cards} />
                </div>
            </div>
        </div>
    );
}