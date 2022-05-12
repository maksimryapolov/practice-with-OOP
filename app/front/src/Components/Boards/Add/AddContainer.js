import React, {useEffect} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import withAuthRedirect from "../../../hoc/withAuthRedirect";
import Loader from "../../Loader/Loader";
import {Add} from "./Add";
import {
    getAccountVal,
    getRecordTypeVal,
    getCurTab,
    getCurCategoryVal
} from "./selector";
import {addCategory} from "../../../redux/redusers/board/segment/categoryReducer";
import {addAccount} from "../../../redux/redusers/board/segment/accountReducer";
import {setCurTab} from "../../../redux/redusers/board/segment/recordTypeReducer";
import {fetchFields, setLoading, updateRecord, deleteRecord} from "../../../redux/redusers/addRecordsReducer";

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
        updateRecord,
        deleteRecord,
        setCurTab,
        curTab
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
                deleteRecord={deleteRecord}
                setCurTab={setCurTab}
                curTab={curTab}
            />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        category: getCurCategoryVal(state),
        account: getAccountVal(state),
        recordType: getRecordTypeVal(state),
        curTab: getCurTab(state),
        test: getCurCategoryVal(state),
        isLoading: state.addRecords.isLoading
    };
}

export default compose(
    connect( mapStateToProps, {fetchFields, setLoading, addCategory, addAccount, updateRecord, deleteRecord, setCurTab}),
    withAuthRedirect
)(AddContainer);
