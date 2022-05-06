import React, {useState} from "react";

export const withSegmentInput = Component => {
    const SegmentInput = props => {
        const { handlerProcess, item } = props;

        const val = item ? item.name : "";
        //TODO: Дубль ./Components/Boards/Add/RadioButton/RadioButtonSelf.jsx
        const [isShow, setSow] = useState(false);
        const [value, setValue] = useState(val);

        const onChangeShow = () => {
            setSow(!isShow);
        }

        const onChange = (e) => {
            setValue(e.target.value)
        }

        const onProcess = async (params) => {
            await handlerProcess(params);
            setValue('');
            setSow(!isShow);
        }
        // END

        return (
            <Component
                onChangeShow={onChangeShow}
                onProcess={onProcess}
                onChange={onChange}
                isShow={isShow}
                value={value}
                {...props}
            />
        );
    }

    return SegmentInput;
}

