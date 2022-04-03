import React from "react";
import {Navigate, NavLink} from "react-router-dom";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        // isAuth: state.usersPage.isAuth
        auth: state.authPage.isAuth
    };
}

let withAuthRedirect = (Component) => {
    class AuthRedirectComponent extends React.Component {
        render() {
            if(!this.props.auth) {
                return <div>
                    Необходимо авторизоваться <NavLink to={"/auth"}>авторизоваться</NavLink>
                </div>
            }
            return <Component {...this.props}/>;
        }
    }

    return connect(mapStateToProps)(AuthRedirectComponent);
}

export default withAuthRedirect;