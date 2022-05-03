import React, {useState} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {AddSegment} from "./AddSegment";

const AddSegmentContainer = props => {
    const { handlerProcess, nameValue, id } = props;

    //TODO: Дубль ./Components/Boards/Add/RadioButton/RadioButtonSelf.jsx
    const [isShow, setSow] = useState(false);
    const [value, setValue] = useState(nameValue);

    const onChangeShow = () => {
        setSow(!isShow);
    }

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const onAdd = async (params) => {
        await handlerProcess(params);
        setValue('');
        setSow(!isShow);
    }
    // END

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
