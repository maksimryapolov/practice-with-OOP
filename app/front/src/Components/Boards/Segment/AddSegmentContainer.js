import React, {useState} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {AddSegment} from "./AddSegment";

const AddSegmentContainer = props => {
    const {handlerAddRecord} = props;
    const [isShow, setSow] = useState(false);
    const [value, setValue] = useState('');

    const onChangeShow = () => {
        setSow(!isShow);
    }

    const onAdd = async (params) => {
        await handlerAddRecord(params);
        setValue('');
        setSow(!isShow);
    }

    const onChange = (e) => {
        if(e.target.value) {
            setValue(e.target.value)
        }
    }

    return (
        <AddSegment
            onChangeShow={onChangeShow}
            onAdd={onAdd}
            onChange={onChange}
            isShow={isShow}
            value={value}
            {...props}
        />
    );
}

export default compose(
    connect(null, null)
)(AddSegmentContainer);
