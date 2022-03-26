import React from "react";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        isAuth: state.usersPage.isAuth
    };
}

let withAuthRedirect = (Component) => {
    class AuthRedirectComponent extends React.Component {
        render() {
            if(!this.props.isAuth) return <Navigate to="/" />
            return <Component {...this.props}/>;
        }
    }

    return connect(mapStateToProps)(AuthRedirectComponent);
}

export default withAuthRedirect;