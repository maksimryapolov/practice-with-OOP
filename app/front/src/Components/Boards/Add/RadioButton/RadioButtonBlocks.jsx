import React from 'react';
import {RadioButtonWrapper} from "./RadioButtonWrapper.jsx";
import {ErrorMessage} from "formik";
import AddSegmentContainer from "../../Segment/AddSegmentContainer";

export const RadioButtonBlocks = props => {
    const {nameSection, list, updateRecord, addItem, title} = props;

    return (
        <div className="mb-4">
            <RadioButtonWrapper
                name={nameSection}
                data={list}
                title={title}
                updateRecord={updateRecord}
            />
            <ErrorMessage name={nameSection}>
                {
                    errorMessage => <div>{errorMessage}</div>
                }
            </ErrorMessage>
        </div>
    );
}