import React, {useState} from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import Register from "./Register";
import {sendData} from "../../../redux/redusers/registerReducer";
import {withWrapperSendForm} from "../../../hoc/withWrapperSendForm";

const RegisterContainer = props => {
    return <Register isRegister={props.isRegister}
                     onSubmit={props.onSubmit}
                     errorMsg={props.errorsMsg}
                     loading={props.loading}
            />
}

const mapStateToProps = state => {
    return {
        isRegister: state.register.isRegister,
        errorsMsg: state.register.errorsMsg
    }
}

export default compose(
    connect(mapStateToProps, {sendData}),
    withWrapperSendForm
)(RegisterContainer);
