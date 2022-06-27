import React from "react";

const Pagination = ({ pages, limit, cur, handlerSetCurPage }) => {
    console.log({ pages, limit, cur });

    const items = () => {
        let items = [];
        for(let i = 1; i <= pages; i++) {
            items.push(
                <li key={i}
                    className="cursor-pointer"
                    onClick={ () => handlerSetCurPage(i) }
                >
                    <span className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
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
                 { items() }
                </ul>
            </div> :
         null
    );
}

export default React.memo(Pagination);
