import React, {useEffect} from "react";
import {compose} from "redux";
import {setFields} from "../../../redux/redusers/addRecordsReducer";
import {connect} from "react-redux";
import withAuthRedirect from "../../../hoc/withAuthRedirect";
import Loader from "../../Loader/Loader";
import {useQuery} from "react-query";
import {Add} from "./Add";
import {
    getCategoryVal,
    getAccountVal,
    getRecordTypeVal
} from "./selector";
import {addCategory} from "../../../redux/redusers/board/segment/categoryReducer";
import {addAccount} from "../../../redux/redusers/board/segment/accountReducer";
import {fetchFields, setLoading} from "../../../redux/redusers/addRecordsReducer";

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
        addAccount
    } = props;

    useEffect(async () => {
        await fetchFields();
        setLoading(false);
    }, []);

    /*const {data, isLoading, error} = useQuery(
        'selectedVale',
        () => {
            return api.post("/boards/get-field-list")
        },
    );*/

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
    connect( mapStateToProps, {fetchFields, setLoading, addCategory, addAccount}),
    withAuthRedirect
)(AddContainer);
