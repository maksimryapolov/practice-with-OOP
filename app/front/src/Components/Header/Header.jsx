import React from "react";
import {NavLink} from "react-router-dom";
import { connect } from "react-redux";
import s from "./header.module.css";
import logo from "../../assets/img/bill.png";

function Header (props) {
    return (
        <header className={s.header}>
            <div className={s.logo}>
                <h1>
                    <NavLink className={s.logo_link} to="/">
                        <img className={s.logo_img} src={logo} alt="Logo"/>
                        <span>Финмэн</span>
                    </NavLink>
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