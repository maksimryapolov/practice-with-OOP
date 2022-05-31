import React from "react";

export const BoardsInfo = ({ typesAction, total, activeType, setTab }) => {
    return (
        <>
            <div className="mb-4">
                <ul className="flex">
                    {
                        typesAction.map((i, idx) => {
                            return (
                                <li className="flex " key={i.id}>
                                    <input
                                        name="test"
                                        type="radio"
                                        id={`item-${i.id}`}
                                        className="hidden type-toggle"
                                        value={i.id}
                                        checked={i.id === activeType}
                                        onChange={() => { setTab(i.id) }}
                                    />
                                    <label htmlFor={`item-${i.id}`}
                                           id={`tab-${i.id}`}
                                           // onClick={() => { setCurTab(i.id) }} // Поменять на событие изменения
                                           className="px-12 py-3 rounded-md cursor-pointer bg-indigo-50 hover:bg-indigo-100 hover:text-indigo-500 mr-6"> {/*bg-indigo-500 text-white*/}
                                        {i.name}
                                    </label>
                                </li>
                            )
                        })
                    }
                    <li className='flex'>
                        <div className="px-8 py-3 border rounded-md border-indigo-200">
                            Общая сумма: <span>{ total } ₽</span>
                        </div>
                    </li>

                </ul>
            </div>
            {/*<ul className="flex mb-5">
                { typesAction.map((i) => <li className="mr-5" key={i.id}>{i.name}</li>) }
            </ul>*/}
        </>
    );
}