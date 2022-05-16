import React, {useEffect} from "react";
import { Boards } from "./Boards";
import {connect} from "react-redux";
import {getTypesAction} from "../../redux/redusers/board/boardReducer";
import {getTypes, getTotal} from "./selector";

const BoardsContainer = ({ getTypesAction, typesAction, total }) => {
    useEffect(() => {
        getTypesAction();
    }, [])

    return (
        <Boards
            typesAction={typesAction}
            total={total}
        />
    )
}

const mapStateToProps = (state) => {
    return {
        typesAction: getTypes(state),
        total: getTotal(state)
    }
}

export default connect(mapStateToProps, {getTypesAction})(BoardsContainer);
