import React from "react";
import { NavLink} from "react-router-dom";

const Pagination = ({ pages, limit, cur, handlerSetCurPage }) => {
    const classNameForItem = "py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white";
    const activeClassItem = "text-black bg-gray-200";

    const items = () => {
        let items = [];
        for(let i = 1; i <= pages; i++) {
            items.push(
                <li key={i}
                    className="cursor-pointer"
                    onClick={ () => handlerSetCurPage(i) }
                >
                    <span className={`${classNameForItem} ${ (cur === i ) ? activeClassItem : null}`}>
                        {i}
                    </span>
                </li>
            );
        }
        return items;
    }

    return (
        (pages > 1) ?
            <div className="text-center mb-8">
                <ul className="inline-flex -space-x-px">
                    {
                        (cur !== 1) ?
                            <li
                                className="cursor-pointer"
                                onClick={ () => handlerSetCurPage(--cur) }
                            >
                                <span className={classNameForItem}>
                                    {"<"}
                                </span>
                            </li> :
                        null
                    }
                    { items() }
                    {
                        (cur !== pages) ?
                            <li
                                className="cursor-pointer"
                                onClick={ () => handlerSetCurPage(++cur) }
                            >
                                <span className={classNameForItem}>
                                    {">"}
                                </span>
                            </li> :
                            null
                    }
                </ul>
            </div> :
         null
    );
}

export default React.memo(Pagination);
