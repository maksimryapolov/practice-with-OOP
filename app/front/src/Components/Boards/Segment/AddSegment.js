import React from "react";
import {InputField} from "../InputField/InputField";

export const AddSegment = props => {
    const {
        segment,
        onChangeShow,
        onProcess,
        isShow,
        value,
        onChange,
        txtBtn,
    } = props;

    return (
        <div className="flex">
            { isShow ? (
                    <InputField
                        value={value}
                        onChange={onChange}
                        segment={segment}
                        changeShow={onChangeShow}
                        processHandler={onProcess}
                    />
                 )
                :(
                    <div className="flex justify-center items-end cursor-pointer">
                        <div className="w-6 h-6 rounded-full shadow-gray-500/50 shadow-md text-green-400 text-center text-xl">+</div>
                        <div className="ml-2 text-sm underline decoration-1" onClick={onChangeShow}>{txtBtn}</div>
                    </div>
                )
            }
        </div>
    );
}
