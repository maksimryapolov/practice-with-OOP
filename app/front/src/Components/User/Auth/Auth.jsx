import React, { useEffect, useState } from 'react';
import Loader from "../../Loader/Loader";
import LoginForm from "../../../common/forms/LoginForm";

export const Auth = props => {
    if(props.loading) {
        return <Loader/>
    }

    if (props.isAuth) {
        return (
            <>
                <h1>Вы успешно авторизовались!</h1>
                <div>
                    <b>Логин:</b> {props.user.name}
                </div>
                <div>
                    <b>Email:</b> {props.user.email}
                </div>
                <br/>
                <button onClick={props.onClickLogout}>Выйти</button>
            </>
        );
    }

    return (
        <LoginForm onSubmit={props.onSubmit}/>
    );
}