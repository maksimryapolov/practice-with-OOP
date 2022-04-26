import React from "react";
import {Formik, Field, Form} from "formik";

export const SelectorInput = props => {
    const {name, data, title} = props;

    return (
        <>
            <div className="flex flex-col mb-4 last:mb-0 flex-1">
                <div className="text-xl mb-1 font-bold text-indigo-500">{title}</div>
                <Field name={name}>
                    {
                        ({field}) => {
                            return data.map((item, idx) => {
                                return (
                                    <React.Fragment key={idx}>
                                        <div className="mb-2 last:mb-0">
                                            <input type="radio" {...field} value={item.id} id={`${name}${item.id}`} className="mr-2"/>
                                            <label htmlFor={`${name}${item.id}`}>{item.name}</label>
                                        </div>
                                    </React.Fragment>
                                )
                            })
                        }
                    }
                </Field>
            </div>
        </>
    );
}
