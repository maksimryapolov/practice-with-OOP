import React from "react";

export const BoardRowHead = ({ str }) => {
    return (
        <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
            {str}
        </th>
    );
}