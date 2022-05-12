import React, {useState} from "react";
import {InputField} from "../../InputField/InputField";
import "./style.css";
import {compose} from "redux";
import {connect} from "react-redux";
import {withSegmentInput} from "../../../../hoc/withSegmentInput";

export const RadioButtonSelf = props => {
    const {field, item, id, name, updateAllowed, deleteRecord, deleteAllowed, isShow, onChangeShow, onChange, value, onProcess, typeId} = props
    const onDelete = async (params) => {
        await deleteRecord(params);
    }
    // END

    return (
        <div className="mt-2 last:mb-0">
            {!isShow ? (
                <>
                    <div className="flex items-end radio-button min-h-[20px]">
                        <input type="radio" {...field} value={item.id} id={id} className="mr-2"/>
                        <label className="hover:underline hover:text-black cursor-pointer text-gray-600" htmlFor={id}>{item.name}</label>
                        {updateAllowed ?
                            <div
                                className="w-5 h-5 ml-5 rounded-full shadow-gray-500/50 shadow-md text-indigo-500 text-center text-xs flex justify-center items-center cursor-pointer hidden radio-button__action"
                                onClick={onChangeShow}
                            >
                                <div>🖊</div>
                            </div>
                            : null
                        }
                        {
                            deleteAllowed ?
                                <div className="flex justify-center items-center w-5 h-5 ml-2 rounded-full shadow-gray-500/50 shadow-md text-red-400 text-xl cursor-pointer hidden radio-button__action"
                                     onClick={() => { onDelete({id: item.id, segment: name}) }}>
                                    <div>×</div>
                                </div>
                                : null
                        }

                    </div>
                </>
            ) : (<>
                <InputField
                    value={value}
                    onChange={onChange}
                    segment={name}
                    id={item.id}
                    changeShow={onChangeShow}
                    processHandler={onProcess}
                    typeId={typeId}
                />
            </>)}
        </div>
    );
}

export default compose(
    connect(null, null),
    withSegmentInput
)(RadioButtonSelf);