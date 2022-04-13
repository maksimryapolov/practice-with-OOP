import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {WrapperField} from "./inputFields/WrapperField";
import {WrapperBtn} from "./inputBtn/WrapperBtn";

const initialValues = () => {
    return {
        login: "",
        email: "",
        password: ""
    };
};

const validationSchema = Yup.object({
    login: Yup.string()
        .min(3, "Минимальная длина 3 символа!")
        .required("Поле обязательно для заполнения!"),
    email: Yup.string()
        .email("Неверный формат почты!")
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
                <Form>
                    <WrapperField name={"login"}
                                  id={"login"}
                                  type={"text"}
                                  title={"Логин"}
                    />
                    <WrapperField name={"email"}
                                  id={"email"}
                                  type={"email"}
                                  title={"Почта"}
                    />
                    <WrapperField name={"password"}
                                  id={"password"}
                                  type={"password"}
                                  title={"Пароль"}
                    />

                    <WrapperBtn loading={this.props.loading} />
                </Form>
            </Formik>
        );
    }
}
