import React from "react";
import { connect } from "react-redux";
import { sendAuthData, setLoading, logout } from "../../redux/redusers/authReducer";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Loader from "../Loader/Loader";

const initialValues = () => {
    return {
        login: "",
        password: "",
    };
};

const validationSchema = Yup.object({
    login: Yup.string()
        .min(3, "Минимальная длина 3 символа")
        .required("Поле обязательно для заполнения!"),

    password: Yup.string()
        .min(6, "Минимальная длина 6 символов")
        .required("Поле обязательно для заполнения!"),
});

class Auth extends React.Component {
    onSubmit = async (values) => {
        this.props.setLoading(true);
        await this.props.sendAuthData(values.login, values.password);
        this.props.setLoading(false);

    };

    onClickLogout = async () => {
        this.props.setLoading(true);
        await this.props.logout();
        this.props.setLoading(false);
    }

    render() {
        if(this.props.loading) {
            return <Loader/>
        }

        if (this.props.isAuth) {
            return (
                <>
                    <h1>Вы успешно авторизовались!</h1>
                    <div>
                        <b>Логин:</b> {this.props.user.name}
                    </div>
                    <div>
                        <b>Email:</b> {this.props.user.email}
                    </div>
                    <br/>
                    <button onClick={this.onClickLogout}>Выйти</button>
                </>
            );
        }

        return (
            <Formik
                initialValues={initialValues()}
                onSubmit={this.onSubmit}
                validationSchema={validationSchema}
            >
                <Form>
                    <div>
                        <Field name="login" type="text" />
                        <ErrorMessage name="login" />
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

function mapStateToProps(state) {
    return {
        isAuth: state.authPage.isAuth,
        user: state.authPage.user,
        loading: state.authPage.loading,
    };
}

let AuthContainer = connect(mapStateToProps, { sendAuthData, setLoading, logout })(Auth);
export default AuthContainer;
