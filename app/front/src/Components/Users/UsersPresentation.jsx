import React from "react";
import Loader from "../Loader/Loader";

import s from "./users.module.css";
import {NavLink} from "react-router-dom";

const UsersPresentation = (props) => {

    let loader = "";

    if(props.isLoading) {
        loader = <Loader />
    }

    let users = props.users.map((i, idx) => {
        return  <li key={idx}><NavLink to={`/users/${i.id}`}>{i.id}</NavLink> - Name: {i.name}, | Phone: {i.phone} | email: {i.email}</li>
    });

    let pagination = () => {
        let items = [];
        let countAllPages = Math.ceil(props.pagination.all/props.pagination.limit);

        for (let i = 1; countAllPages >= i; i++) {
            items.push(<li
                key={i}
                onClick={ (e) => { props.paginClickHandler(parseInt(e.target.textContent)) }}
                className={props.pagination.current === i ? s.active : ""}
            >
                {i}
            </li>);
        }
        return items;
    };

    return <div className={s.users}>
        {loader}
        <ul>
            {users}
        </ul>
        <ul className={s.pagination}>
            {pagination()}
        </ul>
    </div>
}

export default UsersPresentation;