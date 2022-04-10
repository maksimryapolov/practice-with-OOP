import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import s from "./forms.module.css";

const initialValues = () => {
    return {
        login: "",
        password: "",
    };
};

const validationSchema = Yup.object({
    login: Yup.string()
        .min(3, "Минимальная длина 3 символа!")
        .required("Поле обязательно для заполнения!"),

    password: Yup.string()
        .min(6, "Минимальная длина 6 символов!")
        .required("Поле обязательно для заполнения!"),
});

export default class extends React.Component {
    render() {
        return (
            <Formik
                initialValues={initialValues()}
                onSubmit={this.props.onSubmit}
                validationSchema={validationSchema}
            >
                <Form className={s.loginForm}>
                    <div className={s.wrapper}>
                        <label htmlFor="login">Логин/почта</label>
                        <Field id="login" name="login" type="text"/>
                        <div className={s.error}>
                            <ErrorMessage name="login" />
                        </div>
                    </div>
                    <div className={s.wrapper}>
                        <label htmlFor="password">Пароль</label>
                        <Field id="password" name="password" type="password" />
                        <div className={s.error}>
                            <ErrorMessage name="password" />
                        </div>
                    </div>
                    <div className={s.wrapper}>
                        <Field
                            className={s.btn}
                            name="submit"
                            type="submit"
                            placeholder="Войти"
                        />
                    </div>
                </Form>
            </Formik>
        );
    }
}
