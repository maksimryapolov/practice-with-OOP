import React, {useState} from "react";
import {InputField} from "../../InputField/InputField";

export const RadioButtonSelf = props => {
    const {field, item, id, name, updateRecord} = props

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

    return (
        <div className="mt-2 last:mb-0">
            {!isShow ? (
                <>
                    <div className="flex items-end">
                        <input type="radio" {...field} value={item.id} id={id} className="mr-2"/>
                        <label htmlFor={id}>{item.name}</label>
                        <div
                            className="w-5 h-5 ml-5 rounded-full shadow-gray-500/50 shadow-md text-indigo-500 text-center text-xs flex justify-center items-center cursor-pointer"
                            onClick={changeShow}
                        >
                            <div>🖊</div>
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