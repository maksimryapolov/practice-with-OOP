import React from "react";
import {ErrorMessage, Field} from "formik";
import "./style.css";

export const Tabs = props => {
    const { items, setCurTab, name } = props;

    return (
        <div className="mb-4">
            <ul className="flex">
                <Field name={name} >
                    {
                        ({field}) => {
                           return  items.map((i, idx) => {
                                return (
                                    <li className="w-[50%] flex" key={i.id}>
                                        <input
                                            type="radio"
                                            id={`item-${i.id}`}
                                            className="hidden type-toggle"
                                            {...field}
                                            value={i.id}
                                        />
                                        <label htmlFor={`item-${i.id}`}
                                               id={`tab-${i.id}`}
                                               onClick={() => { setCurTab(i.id) }} // Поменять на событие изменения
                                               className="px-12 py-3 rounded-md cursor-pointer bg-indigo-50 hover:bg-indigo-100 hover:text-indigo-500"> {/*bg-indigo-500 text-white*/}
                                            {i.name}
                                        </label>
                                    </li>
                                )
                            })
                        }
                    }
                </Field>
            </ul>
            <ErrorMessage name={name}>
                {
                    errorMessage => <div>{errorMessage}</div>
                }
            </ErrorMessage>
        </div>
    );
}