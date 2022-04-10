import React from 'react';
import RegisterForm from "../../../common/forms/RegisterForm";
import {NavLink} from "react-router-dom";
import s from "./register.module.css";

const Register = props => {
    if(props.isRegister) {
        return <div className={s.register}>
            <h2>Вы успешно зарегестрировались!</h2>
            <div className={s.subtitle}>
                Необходимо <NavLink to={"/auth"}>авторизоваться.</NavLink>
            </div>
        </div>
    }

    return (
        <div className={s.register}>
            <div className={s.top}>
                <h2 className={s.title}>Зарегистрироваться</h2>
                <div className={s.subtitle}>У вас уже есть аккаунт?&nbsp;
                    <NavLink to="/auth">Авторизуйтесь.</NavLink>
                </div>
            </div>
            <div className={s['main-error-block']}>
                { props.errorMsg.map((i, idx) => <div className={s['main-error']} key={idx}>{i}</div>) }
            </div>
            <div className={s.wrapper}>
                <RegisterForm onSubmit={props.onSubmit}/>
            </div>
        </div>
    );
}

export default Register;
