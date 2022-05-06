import React, {useState} from "react";
import {Field} from "formik";
import RadioButtonSelf from "./RadioButtonSelf";

export const RadioButtonWrapper = props => {
    const {name, data, title, updateRecord, updateAllowed, deleteRecord, deleteAllowed} = props;

    return (
        <>
            <div className="flex flex-col mb-4 last:mb-0 flex-1">
                <div className="text-xl mb-1 font-bold text-indigo-500">{title}</div>
                <Field name={name}>
                    {
                        ({field}) => {
                            return data.map((item, idx) => {
                                const id = `${name}-${item.id}`;
                                return (
                                    <RadioButtonSelf
                                        key={idx}
                                        field={field}
                                        item={item}
                                        id={id}
                                        name={name}
                                        handlerProcess={updateRecord}
                                        updateAllowed={updateAllowed}
                                        deleteRecord={deleteRecord}
                                        deleteAllowed={deleteAllowed}
                                    />
                                )
                            })
                        }
                    }
                </Field>
            </div>
        </>
    );
}

