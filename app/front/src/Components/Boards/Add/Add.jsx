import React from "react";
import {SelectorInput} from "./SelctorInput";
import {Form, Formik, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import AddSegmentContainer from "../Segment/AddSegmentContainer";
import {addCategory} from "../../../redux/redusers/board/segment/categoryReducer";

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
        addAccount
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
                        <SelectorInput
                            name={nameCategory}
                            data={category}
                            title={"Категория"}
                        />
                        <ErrorMessage name={nameCategory}>
                            {
                                errorMessage => <div>{errorMessage}</div>
                            }
                        </ErrorMessage>
                        <AddSegmentContainer segment={nameCategory} handlerAddRecord={addCategory} />
                    </div>

                    <div className="flex flex-col flex-1">
                    <SelectorInput
                            name={nameAccount}
                            data={account}
                            title={"Аккаунт"}
                        />
                        <ErrorMessage name={nameAccount}>
                            {
                                errorMessage => <div>{errorMessage}</div>
                            }
                        </ErrorMessage>
                        <AddSegmentContainer segment={nameAccount} handlerAddRecord={addAccount}/>
                    </div>
                    <div className="flex flex-col flex-1">
                        <SelectorInput
                            name={nameType}
                            data={recordType}
                            title={"Тип"}
                        />
                        <ErrorMessage name={nameType}>
                            {
                                errorMessage => <div>{errorMessage}</div>
                            }
                        </ErrorMessage>
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
