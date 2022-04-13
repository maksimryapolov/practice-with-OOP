import React, {useState} from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { sendData, setLoading, logout } from "../../../redux/redusers/authReducer";
import { Auth } from "./Auth";
import {exampleAuth, getTxt, loading, statusAuth, userData, getErrorsMsg} from "./select";
import axios from "axios";
import {useQuery} from "react-query";
import {withWrapperSendForm} from "../../../hoc/withWrapperSendForm";

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
