import React, { useEffect, useState } from 'react';
import Loader from "../../Loader/Loader";
import LoginForm from "../../../common/forms/LoginForm";
import {useQuery} from "react-query";
import axios from "axios";
import s from "./auth.module.css";
import {NavLink} from "react-router-dom";

const sendCheckUserName = ({ queryKey }) => {
    const email = queryKey[1];
    return axios.post('http://localhost/api/user/check-email', {email});
}

const useSendUserNameProfile = (email) => {
    return useQuery(
        ['username', email],
        sendCheckUserName,
        {
            enabled: !!email
        }
    );
}

export const Auth = props => {
    // let [login, setLogin] = useState("");
    // let {isLoading, error, data} = useSendUserNameProfile(login);

    if(props.loading) {
        return <Loader/>
    }

    if (props.isAuth) {
        return (
            <div className={s.auth}>
                <div className={s.top}>
                    <h2 className={s.title}>Вы успешно авторизовались!</h2>
                    <div className={s.subtitle}>Основная информация</div>
                </div>
                <div>
                    <b>Логин:</b> {props.user.name}
                </div>
                <div>
                    <b>Email:</b> {props.user.email}
                </div>
                <br/>
                <button className={s.btn} onClick={props.onClickLogout}>Выйти</button>
            </div>
        );
    }

    return (
        <div className={s.auth}>
            <div className={s.top}>
                <h2 className={s.title}>Добро пожаловать</h2>
                <div className={s.subtitle}>У вас ещё нет аккаунта?&nbsp;
                    <NavLink to="/register">Зарегистрируйтесь.</NavLink>
                </div>
            </div>
            <div className={s['main-error-block']}>
                { props.errorsMsg.map((i,idx)=> <div className={s['main-error']} key={idx}>{i}</div>) }
            </div>
            <div className={s.wrapper}>
                <LoginForm onSubmit={props.onSubmit}/>
            </div>
        </div>
    );
}