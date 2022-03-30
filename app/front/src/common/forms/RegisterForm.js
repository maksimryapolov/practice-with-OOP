import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const initialValues = () => {
    return {
        login: "",
        email: "",
        password: ""
    };
};

const validationSchema = Yup.object({
    login: Yup.string()
        .min(3, "Минимальная длина 3 символа")
        .required("Поле обязательно для заполнения!"),
    email: Yup.string().email("Неверный формат почты!"),
    password: Yup.string()
        .min(6, "Минимальная длина 6 символов")
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
                    <div>
                        <Field name="login" type="text" />
                        <ErrorMessage name="login" />
                    </div>
                    <div>
                        <Field name="email" type="text" />
                        <ErrorMessage name="email" />
                    </div>
                    <div>
                        <Field name="password" type="password" />
                        <ErrorMessage name="password" />
                    </div>
                    <div>
                        <Field
                            name="submit"
                            type="submit"
                            placeholder="Отправить"
                        />
                    </div>
                </Form>
            </Formik>
        );
    }
}
