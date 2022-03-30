import React from 'react';
import RegisterForm from "../../../common/forms/RegisterForm";
import {NavLink} from "react-router-dom";

const Register = props => {

    if(props.isRegister) {
        return <div>
            Вы успешно зарегестрировались! Необходимо <NavLink to={"/auth"}>авторизоваться</NavLink>
        </div>
    }

    return (
        <RegisterForm onSubmit={props.onSubmit}/>
    );
}

export default Register;
