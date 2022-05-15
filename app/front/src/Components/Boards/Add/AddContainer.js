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
    getCurCategoryVal,
    getUserId,
    getStatus
} from "./selector";
import {addCategory} from "../../../redux/redusers/board/segment/categoryReducer";
import {addAccount} from "../../../redux/redusers/board/segment/accountReducer";
import {setCurTab} from "../../../redux/redusers/board/segment/recordTypeReducer";
import {fetchFields, setLoading, updateRecord, deleteRecord} from "../../../redux/redusers/addRecordsReducer";
import {setStatusAdding} from "../../../redux/redusers/board/boardReducer";
import {creatBoard} from "../../../redux/redusers/board/boardReducer";



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
        curTab,
        userId,
        creatBoard,
        statusAddition,
        setStatusAdding
    } = props;

    const onSubmit = async values => {
        await creatBoard(values);
        setCurTab(0);
    }

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
                userId={userId}
                statusAddition={statusAddition}
                setStatusAdding={setStatusAdding}
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
        statusAddition: getStatus(state),
        isLoading: state.addRecords.isLoading,
        userId: getUserId(state)
    };
}

export default compose(
    connect( mapStateToProps, {fetchFields, setLoading, addCategory, addAccount, updateRecord, deleteRecord, setCurTab, creatBoard, setStatusAdding}),
    withAuthRedirect
)(AddContainer);
