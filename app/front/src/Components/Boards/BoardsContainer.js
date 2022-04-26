import React from "react";
import {useQuery} from "react-query";
import axios from "axios";
import {NavLink, Routes, Route, Outlet} from "react-router-dom";

const sendCheckUserName = ({ queryKey }) => {
    const email = queryKey[1];
    return axios.post('http://localhost/api/user/check-email', {email});
}

export const BoardsContainer = props => {

    /* useQuery(
        ['username'],
        sendCheckUserName,
    );*/

    return (
        <>
            Список
        </>
    )
}