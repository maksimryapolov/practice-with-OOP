import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { sendAuthData, setLoading, logout } from "../../../redux/redusers/authReducer";
import { Auth } from "./Auth";

class AuthContainer extends React.Component {
    onSubmit = async (values) => {
        this.props.setLoading(true);
        await this.props.sendAuthData(values.login, values.password);
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
                     onSubmit={this.onSubmit} />
    }
}

function mapStateToProps(state) {
    return {
        isAuth: state.authPage.isAuth,
        user: state.authPage.user,
        loading: state.authPage.loading,
    };
}

export default compose(
    connect(mapStateToProps, { sendAuthData, setLoading, logout }),
)(AuthContainer);
