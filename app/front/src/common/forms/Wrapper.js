import React from "react";
import s from "./forms.module.css"

export const Wrapper = props => {
    return (
        <div className={s.wrapper}>
            { props.children }
        </div>
    );
}