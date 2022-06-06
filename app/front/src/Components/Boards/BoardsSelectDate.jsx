import React from "react";
import { CustomDatepicker } from "./CustomDatepicker";

export const BoardsSelectDate = ({ setDate }) => {
    return (
        <div>
            <div>За какой месяц выводить:</div>
            <span className=" pl-1 p-3 mb-8 inline-block rounded-full border-indigo-500">
                <CustomDatepicker handler={setDate} />
            </span>
        </div>
    );
}
