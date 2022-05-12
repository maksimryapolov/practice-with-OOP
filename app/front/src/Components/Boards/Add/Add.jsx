import React from "react";
import {Form, Formik, Field, ErrorMessage, FormikValues} from "formik";
import * as Yup from "yup";
import AddSegmentContainer from "../Segment/AddSegmentContainer";
import {RadioButtonBlocks} from "./RadioButton/RadioButtonBlocks";
import date from "date-and-time";
import {Tabs} from "./Tabs";

const initialValues = {
    sum: 0,
    time: date.format(new Date(), "HH:mm"),
    date: date.format(new Date(), "YYYY-MM-DD"),
    category: "",
    account: "",
    recordType: ""
};

const validationSchema = value => Yup.object({
    sum: Yup.number().required("Поле обязательно!").positive("Сумма должна быть положительной!"),
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
        updateRecord,
        deleteRecord,
        setCurTab,
        curTab
    } = props;

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >{
            data => {
                return (
                    <Form>
                        <Tabs items={recordType} setCurTab={setCurTab} curTab={curTab} name={nameType} />
                        <div className="flex justify-between">
                            <div className="mb-10 flex-1">
                                <div className="mb-2 font-bold">Сумма:</div>
                                <Field name="sum">
                                    {
                                        ({field}) => {
                                            return <input type="number"
                                                          className="
                                                    rounded-md
                                                    border
                                                    border-gray-400
                                                    focus:border-indigo-400
                                                    bg-white
                                                    focus:outline-none
                                                    min-w-[202px]
                                                    p-2"
                                                          {...field}
                                            />
                                        }
                                    }
                                </Field>
                                <ErrorMessage name="sum">
                                    {
                                        errorMessage => <div className="text-red-400">{errorMessage}</div>
                                    }
                                </ErrorMessage>
                            </div>
                            <div className="flex-1">
                                <div className="mb-2 font-bold">Время:</div>
                                <Field name="time">
                                    {
                                        ({field}) => {
                                            return <input type="time"
                                                          className="
                                                    rounded-md
                                                    border
                                                    border-gray-400
                                                    focus:border-indigo-400
                                                    bg-white
                                                    focus:outline-none
                                                    min-w-[202px]
                                                    p-2"
                                                          {...field}
                                            />
                                        }
                                    }
                                </Field>
                                <ErrorMessage name="time">
                                    {
                                        errorMessage => <div className="text-red-400">{errorMessage}</div>
                                    }
                                </ErrorMessage>
                            </div>
                            <div className="flex-1">
                                <div className="mb-2 font-bold">Дата:</div>
                                <Field name="date">
                                    {
                                        ({field}) => {
                                            return <input type="date"
                                                          className="
                                                    rounded-md
                                                    border
                                                    border-gray-400
                                                    focus:border-indigo-400
                                                    bg-white
                                                    focus:outline-none
                                                    min-w-[202px]
                                                    p-2"
                                                          {...field}
                                            />
                                        }
                                    }
                                </Field>
                                <ErrorMessage name="date">
                                    {
                                        errorMessage => <div className="text-red-400">{errorMessage}</div>
                                    }
                                </ErrorMessage>
                            </div>
                        </div>
                        <div className="flex mb-10">
                            <div className="flex flex-col flex-1">
                                <RadioButtonBlocks
                                    updateAllowed={true}
                                    deleteAllowed={true}
                                    nameSection={nameCategory}
                                    list={category}
                                    title={"Категория"}
                                    updateRecord={updateRecord}
                                    deleteRecord={deleteRecord}
                                    addItem={addCategory}
                                    typeId={data.values[nameType]}
                                />
                                {data.values[nameType] ? <AddSegmentContainer segment={nameCategory} typeId={data.values[nameType]} handlerProcess={addCategory} txtBtn="Добавить" /> : <div>Выберите действие доход/расход</div>}
                            </div>

                            <div className="flex flex-col flex-1">
                                <RadioButtonBlocks
                                    updateAllowed={true}
                                    deleteAllowed={true}
                                    nameSection={nameAccount}
                                    list={account}
                                    title={"Аккаунт"}
                                    updateRecord={updateRecord}
                                    deleteRecord={deleteRecord}
                                    addItem={addAccount}
                                    typeId={null}
                                />
                                <AddSegmentContainer segment={nameAccount} typeId={null} handlerProcess={addAccount} txtBtn="Добавить" />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <Field name="submit">
                                {
                                    ({field}) => {
                                        return <button {...field} className="py-3 px-8 rounded-md cursor-pointer shadow-lg shadow-indigo-500/50 text-white border-indigo-500 bg-indigo-500" type="submit">Добавить</button>
                                    }
                                }
                            </Field>
                        </div>
                    </Form>
                );
            }
        }
        </Formik>
    )
}
