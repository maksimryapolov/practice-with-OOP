import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import Register from "./Register";
import {sendRegisterData} from "../../../redux/redusers/registerReducer";

class RegisterContainer extends React.Component {
    onSubmit = data => {
        this.props.sendRegisterData(data);
    }

    render() {
        return <Register isRegister={this.props.isRegister}
                         onSubmit={this.onSubmit}
                />
    }
}

const mapStateToProps = state => {
    return {
        isRegister: state.register.isRegister
    }
}

export default compose(
    connect(mapStateToProps, {sendRegisterData})
)(RegisterContainer);
