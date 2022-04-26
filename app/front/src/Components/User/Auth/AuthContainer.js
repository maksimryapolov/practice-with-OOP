import React, {useState} from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { sendData, setLoading, logout } from "../../../redux/redusers/authReducer";
import { Auth } from "./Auth";
import {getTxt, statusAuth, userData, getErrorsMsg} from "./select";
import {withWrapperSendForm} from "../../../hoc/withWrapperSendForm";

const AuthContainer = (props) => {
    const [loading, setLoading] = useState(false);

    const onClickLogout = async () => {
        props.setLoading(true);
        await props.logout();
        props.setLoading(false);
    }

    return <Auth loading={props.loading}
                 isAuth={props.isAuth}
                 user={props.user}
                 onClickLogout={onClickLogout}
                 onSubmit={props.onSubmit}
                 errorsMsg={props.errorsMsg} />
}

function mapStateToProps(state) {
    return {
        isAuth: statusAuth(state),
        user: userData(state),
        errorsMsg: getErrorsMsg(state)
    };
}

export default compose(
    connect(mapStateToProps, { sendData, setLoading, logout }),
    withWrapperSendForm
)(AuthContainer);
