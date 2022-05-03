import React, {useState} from "react";
import {InputField} from "../../InputField/InputField";
import "./style.css";

export const RadioButtonSelf = props => {
    const {field, item, id, name, updateRecord, updateAllowed} = props
    //TODO: Дубль ./Components/Boards/Segment/AddSegmentContainer.js
    const [isShow, setShow] = useState(false);
    const [value, setValue] = useState(item.name);

    const changeShow = () => {
        setShow(!isShow);
    }

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const onUpdate = async (params) => {
        await updateRecord(params);
        setValue('');
        changeShow();
    }
    // END

    return (
        <div className="mt-2 last:mb-0">
            {!isShow ? (
                <>
                    <div className="flex items-end radio-button min-h-[20px]">
                        <input type="radio" {...field} value={item.id} id={id} className="mr-2"/>
                        <label className="hover:underline" htmlFor={id}>{item.name}</label>
                        {updateAllowed ?
                            <div
                                className="w-5 h-5 ml-5 rounded-full shadow-gray-500/50 shadow-md text-indigo-500 text-center text-xs flex justify-center items-center cursor-pointer hidden radio-button__action"
                                onClick={changeShow}
                            >
                                <div>🖊</div>
                            </div>
                            : null
                        }
                        <div className="flex justify-center items-center w-5 h-5 ml-2 rounded-full shadow-gray-500/50 shadow-md text-red-400 text-xl cursor-pointer hidden radio-button__action">
                            <div>×</div>
                        </div>

                    </div>
                </>
            ) : (<>
                <InputField
                    value={value}
                    onChange={onChange}
                    segment={name}
                    id={item.id}
                    changeShow={changeShow}
                    processHandler={onUpdate}
                />
            </>)}
        </div>
    );
}

export default RadioButtonSelf;