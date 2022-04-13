import s from "./error.module.css";
import React from "react";
import {ErrorMessage} from "formik";

export const ErrorMessages = props => {
    return <ErrorMessage name={props.name}>
        {
            errorMessage => <div className={s.error}>{errorMessage}</div>
        }
    </ErrorMessage>
}
