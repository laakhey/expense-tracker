import React from "react";
import {connect} from 'react-redux';
import _ from 'lodash';
import TransactionCard from "../transactions/TransactionCard";
import {NavLink} from "react-router-dom";

class RecentTransaction extends React.Component {

    renderTransactionList() {
        const transactionList = _.slice(_.orderBy(this.props.transactionList, ['date'], ['desc']), 0, 5);
        if (transactionList.length > 0) {
            return transactionList.map(transaction => {
                transaction.hideEdit = true;
                return <TransactionCard key={transaction.id}{...transaction} />
            });
        } else {
            return <li className="list-group-item"><span className="text-secondary">No Data Found! </span></li>;
        }
    }

    render() {
        return (
            <div className="card mb-3">
                <div className="card-header">RECENT TRANSACTION<span className="float-right"><NavLink to="/expense-tracker/transactions" className="nav-link" aria-current="page"><i className="fa fa-list-ul fa-lg"/> View More...</NavLink></span></div>
                <div className="card-body text-primary pl-0 pr-0 pt-0 pb-0">
                    <ul className="list-group">
                        {this.renderTransactionList()}
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        transactionList: state.transaction.list
    }
};

export default connect(mapStateToProps, {})(RecentTransaction);

