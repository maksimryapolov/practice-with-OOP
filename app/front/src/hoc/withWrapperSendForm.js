import React, {useState} from "react";
import {connect} from "react-redux";

export const withWrapperSendForm = Component => {
    const WrapperSendFormComponent = props => {
        const [loading, setLoading] = useState(false);

        const onSubmit = async values => {
            setLoading(true);
            await props.sendData(values);
            setLoading(false);
        };

        return <Component {...props} onSubmit={onSubmit} loading={loading} />
    }

    return WrapperSendFormComponent;
}
