import {Field} from "formik";
import React from "react";
import {Wrapper} from "../Wrapper";

import base from '../forms.module.css'
import s from "./button.module.css";

export const WrapperBtn = props => {
    return (
        <Wrapper>
            {!props.loading ?
                <Field
                    className={base.btn + ' ' + s.button}
                    name="submit"
                    type="submit"
                    placeholder="Войти"
                /> :
                <div className={s.loader}>
                    <span className={s.text}>
                        Загрузка...
                    </span>
                </div>
            }
        </Wrapper>
    )
}