import React, {useState} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {AddSegment} from "./AddSegment";
import {withSegmentInput} from "../../../hoc/withSegmentInput";

const AddSegmentContainer = props => {
    const { nameValue, segment, txtBtn, onChangeShow, onProcess, onChange, isShow, value, typeId } = props;

    return (
        <AddSegment
            onChangeShow={onChangeShow}
            onProcess={onProcess}
            onChange={onChange}
            isShow={isShow}
            value={value}
            nameValue={nameValue}
            segment={segment}
            txtBtn={txtBtn}
            typeId={typeId}
        />
    );
}

export default compose(
    connect(null, null),
    withSegmentInput
)(AddSegmentContainer);
