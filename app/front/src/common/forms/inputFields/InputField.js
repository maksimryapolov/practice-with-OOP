import React from "react";

import base from '../forms.module.css';
import s from './input.module.css';

const style = {...base, ...s};

export const InputField = (props) => {
    const { field, meta, fieldData } = props;
    const showErorrs = meta.touched && meta.error;

    return (
        <div className={ showErorrs ? style.fieldWrapper : null }>
            <input
                className={style.input + ' ' + (showErorrs ? style.errorInput : '')}
                {...fieldData}
                {...field}
            />
        </div>
    );
}
