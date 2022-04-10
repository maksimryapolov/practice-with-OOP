import React, {useState} from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { sendAuthData, setLoading, logout } from "../../../redux/redusers/authReducer";
import { Auth } from "./Auth";
import {exampleAuth, getTxt, loading, statusAuth, userData, getErrorsMsg} from "./select";
import axios from "axios";
import {useQuery} from "react-query";

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
    let [login, setLogin] = useState("");
    // let {isLoading, error, data} = useSendUserNameProfile(login);

    const onSubmit = async (values) => {

        // props.setLoading(true);
        await props.sendAuthData(values.login, values.password);
        // props.setLoading(false);
    };

    const onClickLogout = async () => {
        props.setLoading(true);
        await props.logout();
        props.setLoading(false);
    }

    return <Auth loading={props.loading}
                 isAuth={props.isAuth}
                 user={props.user}
                 onClickLogout={onClickLogout}
                 onSubmit={onSubmit}
                 errorsMsg={props.errorsMsg} />
}

class AuthContainer1 extends React.Component {
    onSubmit = async (values) => {
        let {isLoading, error, data} = useSendUserNameProfile(values.login);
        console.log(data);

        this.props.setLoading(true);
        // await this.props.sendAuthData(values.login, values.password);
        this.props.setLoading(false);
    };

    onClickLogout = async () => {
        this.props.setLoading(true);
        await this.props.logout();
        this.props.setLoading(false);
    }

    render() {
        return <Auth loading={this.props.loading}
                     isAuth={this.props.isAuth}
                     user={this.props.user}
                     onClickLogout={this.onClickLogout}
                     onSubmit={this.onSubmit}
        />
    }
}

function mapStateToProps(state) {
    return {
        isAuth: statusAuth(state),
        user: userData(state),
        loading: loading(state),
        errorsMsg: getErrorsMsg(state)
    };
}

export default compose(
    connect(mapStateToProps, { sendAuthData, setLoading, logout }),
)(AuthContainer);
