import React from "react";

export const BoardRowBody = ({ str }) => {
    const tdClassName = "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900";

    return (
        <td className={tdClassName}>
            { str }
        </td>
    );
}