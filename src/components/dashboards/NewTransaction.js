import React from "react";
import {connect} from 'react-redux';
import {setActiveForm} from "../../actions";
import TransactionForm from "../transactions/TransactionForm";

class NewTransaction extends React.Component {
    render() {
        return (
            <div className="card mb-3">
                <div className="card-header">NEW TRANSACTION</div>
                <TransactionForm/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        activeForm: state.transaction.activeForm
    }
};

export default connect(mapStateToProps, {setActiveForm})(NewTransaction);

