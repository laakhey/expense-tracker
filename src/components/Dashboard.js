import React from "react";
import { connect } from 'react-redux';
import ExpenseForm from '../components/expenses/ExpenseForm'
import TransferForm from "./transfers/TransferForm";
import { setActiveForm } from "../actions";
import IncomeForm from "./incomes/IncomeForm";
import AccountGroupHeader from "../components/accounts/AccountGroupHeader";
import _ from 'lodash';

class Dashboard extends React.Component {

    getForm(form) {
        this.props.setActiveForm(form);
    }

    renderForm() {
        if (this.props.activeForm === "expense") {
            return <ExpenseForm />
        } else if (this.props.activeForm === "transfer") {
            return <TransferForm />
        } else {
            return <IncomeForm />
        }
    }
    renderTransferClass() {
        return `btn btn-light border ${this.props.activeForm === "transfer" ? "active" : ""}`;
    }
    renderExpenseClass() {
        return `btn btn-light border ${this.props.activeForm === "expense" ? "active" : ""}`;
    }
    renderIncomeClass() {
        return `btn btn-light border ${this.props.activeForm === "income" ? "active" : ""}`;
    }

    renderList() {
        const groupList = _.chain(this.props.accountList).groupBy("group").map((value, key) => {
            return {
                "group": key,
                "accountList": value
            };
        }).value();
        return groupList.map(group => {
            group.hideEdit = true;
            return <AccountGroupHeader key={group.group}{...group} />;
        })
    }

    renderTransactionList() {
        const transactionList = _.slice(_.orderBy(this.props.transactionList, ['date'], ['desc']), 0, 5);
        return transactionList.map(transaction => {
            return <li key={transaction.id} className="list-group-item">{transaction.date}</li>;
        })
    }


    render() {
        return (
            <div className="row mt-3">
                <div className="col-3">
                    <div className="card mb-3">
                        <div className="card-header">NET WORTH</div>
                        <div className="card-body text-primary pl-0 pr-0 pt-0 pb-0">
                            {this.renderList()}
                        </div>

                    </div>
                </div>
                <div className="col-9">
                    <div className="card mb-3">
                        <div className="card-header">NEW TRANSACTION</div>
                        <div className="card-body text-primary">
                            <div className="btn-group btn-block mb-3" role="group" aria-label="Basic example">
                                <button type="button" className={this.renderExpenseClass()} onClick={() => this.getForm("expense")}>Expense</button>
                                <button type="button" className={this.renderTransferClass()} onClick={() => this.getForm("transfer")}>Transfer</button>
                                <button type="button" className={this.renderIncomeClass()} onClick={() => this.getForm("income")}>Income</button>
                            </div>
                            {this.renderForm()}
                        </div>
                    </div>

                    <div className="card mb-3">
                        <div className="card-header">RECENT TRANSACTION</div>
                        <div className="card-body text-primary pl-0 pr-0 pt-0 pb-0">
                            <ul className="list-group">
                                {this.renderTransactionList()}
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        activeForm: state.transaction.activeForm,
        accountList: state.account.list,
        transactionList: state.transaction.list
    }
};

export default connect(mapStateToProps, { setActiveForm })(Dashboard);

