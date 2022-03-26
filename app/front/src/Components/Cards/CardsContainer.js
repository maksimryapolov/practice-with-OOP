import React from "react";
import { connect } from "react-redux";
import Cards from "./Cards";
import { getCards, getInputs } from "./select-cars";
import {
    setNewExpens,
    setTextInputCatCreator,
    setTextInputInvCreator,
    setTextInputSumCreator,
    setTextInputDateCreator,
    setTextInputTimeCreator,
    setFakeData,
} from "../../redux/redusers/cardsReduser";

let mapStateToProps = (state) => {
    return {
        cards: getCards(state),
        inputs: getInputs(state),
        fake: state.mainPage.fake,
    };
};

let mapStateToDispatch = (dispatch) => {
    return {
        setTextInputCat: (text) => {
            dispatch(setTextInputCatCreator(text));
        },
        setTextInputInv: (text) => {
            dispatch(setTextInputInvCreator(text));
        },
        setTextInputSum: (text) => {
            dispatch(setTextInputSumCreator(text));
        },
        setTextInputDate: (text) => {
            dispatch(setTextInputDateCreator(text));
        },
        setTextInputTime: (text) => {
            dispatch(setTextInputTimeCreator(text));
        },
        setNewExpens: () => {
            dispatch(setNewExpens());
        },
        setFakeData: (fake) => {
            dispatch(setFakeData(fake));
        },
    };
};

let CardsContainer = connect(mapStateToProps, mapStateToDispatch)(Cards);

export default CardsContainer;
