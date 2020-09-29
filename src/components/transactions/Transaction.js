import React from "react";
import {connect} from "react-redux";
import {openModal} from "../../actions";
import TransactionModal from "./TransactionModal";
import _ from "lodash";
import TransactionCard from "./TransactionCard";

class Transaction extends React.Component {

    renderTransactionList() {
        const transactionList = _.orderBy(this.props.transactionList, ['date'], ['desc']);
        if (transactionList.length) {
            return transactionList.map(transaction => {
                transaction.hideEdit = false;
                return <TransactionCard key={transaction.id}{...transaction} />
            });
        } else {
            return <li className="list-group-item"><span className="text-secondary">No Data Found! </span></li>;
        }
    }

    openModal() {
        this.props.openModal("add");
    }

    render() {
        return (
            <div className="pl-0 pr-0">
                <div className="card">
                    <div className="card-header">
                        <div className="btn-group border"
                             role="group"
                             aria-label="Basic example">
                            <button type="button"
                                    className="btn btn-secondary">
                                <i className="fa fa-plus" aria-hidden="true"> </i></button>
                            <button type="button"
                                    className="btn pr-4 pl-4"
                                    onClick={() => this.openModal()}
                            > New
                            </button>
                        </div>
                    </div>
                    <div className="card-body text-primary pl-0 pr-0 pt-0 pb-0">
                        {this.renderTransactionList()}
                    </div>
                </div>
                <TransactionModal title="New Transaction"/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        transactionList: state.transaction.list
    }
};

export default connect(mapStateToProps, {openModal})(Transaction);


