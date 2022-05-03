import React from "react";
import {Form, Formik, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import AddSegmentContainer from "../Segment/AddSegmentContainer";
import {addCategory} from "../../../redux/redusers/board/segment/categoryReducer";
import {RadioButtonBlocks} from "./RadioButton/RadioButtonBlocks";

const initialValues = {
    category: "",
    account: "",
    recordType: ""
};

const validationSchema = value => Yup.object({
    category: Yup.string().required("Поле обязательно!"),
    account: Yup.string().required("Поле обязательно!"),
    recordType: Yup.string().required("Поле обязательно!")
});

export const Add = props => {
    const nameCategory = "category";
    const nameAccount = "account";
    const nameType = "recordType";
    const {
        onSubmit,
        category,
        account,
        recordType,
        addCategory,
        addAccount,
        updateRecord
    } = props;

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            <Form>
                <div className="flex mb-10">
                    <div className="flex flex-col flex-1">
                        <RadioButtonBlocks
                            updateAllowed={true}
                            nameSection={nameCategory}
                            list={category}
                            title={"Категория"}
                            updateRecord={updateRecord}
                            addItem={addCategory}
                        />
                        <AddSegmentContainer segment={nameCategory} handlerProcess={addCategory} nameValue={""} txtBtn="Добавить" />
                    </div>

                    <div className="flex flex-col flex-1">
                        <RadioButtonBlocks
                            updateAllowed={true}
                            nameSection={nameAccount}
                            list={account}
                            title={"Аккаунт"}
                            updateRecord={updateRecord}
                            addItem={addAccount}
                        />
                        <AddSegmentContainer segment={nameAccount} handlerProcess={addAccount} nameValue={""} txtBtn="Добавить" />
                    </div>

                    <div className="flex flex-col flex-1">
                        <RadioButtonBlocks
                            updateAllowed={false}
                            nameSection={nameType}
                            list={recordType}
                            title={"Тип"}
                        />
                    </div>
                </div>
                <div className="flex justify-center">
                    <Field name="submit">
                        {
                            ({field}) => {
                                return <button {...field} className="py-3 px-8 rounded-md cursor-pointer shadow-lg shadow-indigo-500/50 text-white border-indigo-500 bg-indigo-500" type="submit">Отправить</button>
                            }
                        }
                    </Field>
                </div>
            </Form>
        </Formik>
    )
}
