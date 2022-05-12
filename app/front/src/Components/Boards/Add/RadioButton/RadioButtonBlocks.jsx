import React from 'react';
import {RadioButtonWrapper} from "./RadioButtonWrapper.jsx";
import {ErrorMessage} from "formik";
import AddSegmentContainer from "../../Segment/AddSegmentContainer";

export const RadioButtonBlocks = props => {
    const {nameSection, list, updateRecord, title, updateAllowed, deleteRecord, deleteAllowed, addAllowed, typeId} = props;

    return (
        <div className="mb-4">
            <RadioButtonWrapper
                name={nameSection}
                data={list}
                title={title}
                updateRecord={updateRecord}
                updateAllowed={updateAllowed}
                deleteRecord={deleteRecord}
                deleteAllowed={deleteAllowed}
                addAllowed={addAllowed}
                typeId={typeId}
            />
            <ErrorMessage name={nameSection}>
                {
                    errorMessage => <div>{errorMessage}</div>
                }
            </ErrorMessage>
        </div>
    );
}