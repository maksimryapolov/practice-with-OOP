import React from 'react';
import {RadioButtonWrapper} from "./RadioButtonWrapper.jsx";
import {ErrorMessage} from "formik";
import AddSegmentContainer from "../../Segment/AddSegmentContainer";

export const RadioButtonBlocks = props => {
    const {nameSection, list, updateRecord, title, updateAllowed} = props;

    return (
        <div className="mb-4">
            <RadioButtonWrapper
                name={nameSection}
                data={list}
                title={title}
                updateRecord={updateRecord}
                updateAllowed={updateAllowed}
            />
            <ErrorMessage name={nameSection}>
                {
                    errorMessage => <div>{errorMessage}</div>
                }
            </ErrorMessage>
        </div>
    );
}