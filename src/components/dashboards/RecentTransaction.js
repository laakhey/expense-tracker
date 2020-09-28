import React from "react";
import {connect} from 'react-redux';
import _ from 'lodash';
import TransactionCard from "../transactions/TransactionCard";

class RecentTransaction extends React.Component {

    renderTransactionList() {
        const transactionList = _.slice(_.orderBy(this.props.transactionList, ['date'], ['desc']), 0, 5);
        return transactionList.map(transaction => {
            return <TransactionCard key={transaction.id}{...transaction} />
        });
    }

    render() {
        return (
            <div className="card mb-3">
                <div className="card-header">RECENT TRANSACTION</div>
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

