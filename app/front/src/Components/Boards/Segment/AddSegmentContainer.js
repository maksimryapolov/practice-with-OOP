import React, {useState} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {AddSegment} from "./AddSegment";

const AddSegmentContainer = props => {
    const { handlerProcess, nameValue, id } = props;
    const [isShow, setSow] = useState(false);
    const [value, setValue] = useState(nameValue);

    const onChangeShow = () => {
        setSow(!isShow);
    }

    const onAdd = async (params) => {
        await handlerProcess(params);
        setValue('');
        setSow(!isShow);
    }

    const onChange = (e) => {
        setValue(e.target.value)
    }

    return (
        <AddSegment
            onChangeShow={onChangeShow}
            onAdd={onAdd}
            onChange={onChange}
            isShow={isShow}
            value={value}
            id={id}
            {...props}
        />
    );
}

export default compose(
    connect(null, null)
)(AddSegmentContainer);
