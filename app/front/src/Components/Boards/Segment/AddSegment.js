import React from "react";

export const AddSegment = props => {
    const {
        segment,
        onChangeShow,
        onAdd,
        isShow,
        value,
        onChange
    } = props;

    return (
        <div className="flex">
            { isShow ? (
                <div>
                    <input className={`rounded-md p-2 border border-gray`} type="text" value={value} onChange={onChange} />
                    <div>
                        <span className="cursor-pointer mr-4" onClick={
                            (e) => {
                                onAdd({segment, value})
                            }
                        }>Отправить</span>
                        <span className="cursor-pointer" onClick={onChangeShow}>Закрыть</span>
                    </div>
                </div> )
                : <div className="cursor-pointer" onClick={onChangeShow}>Добавить</div> }
        </div>
    );
}
