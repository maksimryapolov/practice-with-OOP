import { cardsReduser } from "./redusers/cardsReduser";

let store = {
    _state: {
        cards: [
            {
                date: "04.01.2022",
                fullSum: "2000,00",
                currency: "₽",
                items: [
                    {
                        category: "Питание",
                        invoice: "Карта",
                        sum: "500,00",
                        currency: "₽",
                    },
                    {
                        category: "Транспорт",
                        invoice: "Наличные",
                        sum: "1500,00",
                        currency: "₽",
                    },
                ],
            },
        ],
        _inputs: {
            inputTxtCat: "",
        },
    },

    /**
     * getters
     * @returns {store._state._inputs|{inputTxtCat}}
     */
    getInputs() {
        return this._state._inputs;
    },

    getState() {
        return this._state;
    },

    dispatch(action) {
        this._state = cardsReduser(this._state, action);
        this._changeState(this);
    },

    _changeState() {},

    subscribe(observe) {
        this._changeState = observe;
    },
};

window.state = store;

export default store;
