import React from "react";
import {NavLink} from "react-router-dom";

export const BoardRowBodyLink = ({ id }) => {
    const tdClassName = "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 w-5 text-right underline";

    return (
        <td className={tdClassName}>
            <NavLink to={`/boards/${id}`}>
                Редактировать
            </NavLink>
        </td>
    );
}
