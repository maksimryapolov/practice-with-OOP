import s from "./input.module.css";
import {Field} from "formik";
import { InputField } from "./InputField";
import {ErrorMessages} from "../error/ErrorMessage";
import React from "react";
import {Wrapper} from "../Wrapper";

export const WrapperField = props => {
    const fieldData = {id: props.id, type: props.type};

    return (
        <Wrapper>
            <label className={s.label} htmlFor={props.id}>{props.title}</label>
            <Field name={props.name}>
                {
                    props => {
                        return <InputField {...props} fieldData={fieldData}/>
                    }
                }
            </Field>
            <ErrorMessages name={props.name} />
        </Wrapper>
    );
}
