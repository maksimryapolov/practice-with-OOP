export function getCards(state) {
    return state.mainPage.cards;
}

export function getInputs(state) {
    // Например сложная логика
    console.log({ getInpots: "getInputs" });
    return state.mainPage.inputs;
}
