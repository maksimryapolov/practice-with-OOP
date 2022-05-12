import React from "react";

export const InputField = props => {
    const { value, onChange, segment, id, changeShow, processHandler, typeId } = props;

    return (
        <div className="flex max-h-24">
            <input className={`rounded-xl p-2 h-7 border border-gray text-sm`} type="text" value={value} onChange={onChange} />
            <div className="flex">
                <div className="w-6 h-6 ml-2 rounded-full shadow-gray-500/50 shadow-md text-green-400 text-center text-md flex justify-center items-center cursor-pointer" onClick={
                    (e) => {
                        processHandler({segment, value, id, typeId})
                    }
                }>
                    <div>✔</div>
                </div>
                <div className="w-6 h-6 ml-2 rounded-full shadow-gray-500/50 shadow-md text-red-400 text-center text-xl cursor-pointer" onClick={changeShow}>×</div>
            </div>
        </div>
    );
}