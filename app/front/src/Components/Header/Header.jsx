import React from "react";
import {NavLink} from "react-router-dom";
import s from "./header.module.css";
import { connect } from "react-redux";

function Header (props) {
    console.log(props.isAuth);
    return (
        <header className={s.header}>
            <div className={s.logo}>
                <h1>
                    <NavLink to="/">Логотип</NavLink>
                </h1>
            </div>
            <div>
                <ul>
                    <li>
                        <NavLink to="/users">Список пользователей</NavLink>
                    </li>
                </ul>
            </div>
            <div className={s.user}>
                { props.isAuth ?
                    (<NavLink className={({ isActive }) => isActive ? s.linkActive : ""} to="/auth">Личный кабинет</NavLink>)
                    :
                    (<>
                        <NavLink className={({ isActive }) => isActive ? s.linkActive : ""} to="/auth">Войти</NavLink>
                        <NavLink className={({ isActive }) => isActive ? s.linkActive : ""} to="/register">Регистрация</NavLink>
                    </>)
                }
            </div>
        </header>
    );
}

const mapStateToProps = state => {
    return {
        isAuth: state.authPage.isAuth
    }
}

export default connect(mapStateToProps, {})(Header);