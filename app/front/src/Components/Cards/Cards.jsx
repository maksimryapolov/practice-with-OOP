import React from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import date from "date-and-time";
import s from "./cards.module.css";

const initialValues = () => {
    const defaultDate = date.format(new Date(), "DD-MM-YYYY").split("-").reverse().join("-");
    return {
        category: "",
        invoice: "",
        sum: "",
        date: defaultDate,
        time: "",
    }
};

const onSubmit = values => {
    console.log(values);
}

const validationSchema = Yup.object({
    category: Yup.string().required("Поле обязательно для заполнения!")
});


let CardsForm = () => {
    return (
        <Formik
            initialValues={initialValues()}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            <Form>
                <div className="">
                    <div>Категория</div>
                    <Field
                        required
                        type="text"
                        name="category"
                    />
                    <div className={s.error}>
                        <ErrorMessage name="category" />
                    </div>
                </div>
                <div className="">
                    <div>Счет</div>
                    <Field
                        required
                        name="invoice"
                        type="text"
                    />
                </div>
                <div className="">
                    <div>Сумма</div>
                    <Field
                        required
                        name="sum"
                        type="number"
                    />
                </div>
                <div className="">
                    <div>Время</div>
                    <Field name="date" type="date"/>
                </div>
                <div className="">
                    <div>Дата</div>
                    <Field name="time" type="time"/>
                </div>
                <button type="submit">Отправить</button>
            </Form>
        </Formik>
    );
}

function Cards(props) {
    function getBodyInvoice(items) {
        return items.map((item, idx)=>  {
            return (
                <div className={s.line} key={idx}>
                    <div>
                        {item.category}
                    </div>
                    <div>
                        {item.invoice}
                    </div>
                    <div>
                        {item.sum} {item.currency}
                    </div>
                </div>
            );
        });
    }

    function createSum(items) {
        let sum = 0;
        items.forEach((i) => {
            sum += parseInt(i.sum);
        });

        return sum;
    }

    let dataRender = props.cards.map((item, idx) => {
        return (
            <div className={s.card} key={idx}>
                <div className={s.top}>
                    <div className={s.date}>
                        <div>{item.date}</div>
                    </div>
                    <div>
                        { createSum(item.items) } {item.currency}
                    </div>
                </div>
                <div className={s.body}>
                    { getBodyInvoice(item.items) }
                </div>
            </div>
        )
    });

    return (
        <section className={s.cards}>
            { dataRender }
            <CardsForm {...props} />
        </section>
    );
}



export default Cards;