import React from "react";

export const BoardsSelectDate = ({ curDate }) => {
    return (
        <div>
            <div>За какой месяц выводить:</div>
            📅<span className=" pl-1 p-3 mb-8 inline-block rounded-full border-indigo-500">
                { curDate }
            </span>
        </div>
    );
}