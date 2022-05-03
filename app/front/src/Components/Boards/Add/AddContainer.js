import React, {useEffect} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import withAuthRedirect from "../../../hoc/withAuthRedirect";
import Loader from "../../Loader/Loader";
import {Add} from "./Add";
import {
    getCategoryVal,
    getAccountVal,
    getRecordTypeVal
} from "./selector";
import {addCategory} from "../../../redux/redusers/board/segment/categoryReducer";
import {addAccount} from "../../../redux/redusers/board/segment/accountReducer";
import {fetchFields, setLoading, updateRecord} from "../../../redux/redusers/addRecordsReducer";

const onSubmit = value => {
    console.log(value);
}

const AddContainer = props => {
    const {
        isLoading,
        fetchFields,
        setLoading,
        category,
        account,
        recordType,
        addCategory,
        addAccount,
        updateRecord
    } = props;

    useEffect(async () => {
        await fetchFields();
        setLoading(false);
    }, []);

    if(isLoading) {
        return <Loader />
    }

    return (
        <div>
            <Add
                onSubmit={onSubmit}
                category={category}
                account={account}
                recordType={recordType}
                addCategory={addCategory}
                addAccount={addAccount}
                updateRecord={updateRecord}
            />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        category: getCategoryVal(state),
        account: getAccountVal(state),
        recordType: getRecordTypeVal(state),
        isLoading: state.addRecords.isLoading
    };
}

export default compose(
    connect( mapStateToProps, {fetchFields, setLoading, addCategory, addAccount, updateRecord}),
    withAuthRedirect
)(AddContainer);
