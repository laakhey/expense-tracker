import React from "react";
import {connect} from 'react-redux';
import ExpenseForm from '../expenses/ExpenseForm'
import TransferForm from "../transfers/TransferForm";
import {setActiveForm} from "../../actions";
import IncomeForm from "../incomes/IncomeForm";

class TransactionForm extends React.Component {

    getForm(form) {
        this.props.setActiveForm(form);
    }

    renderForm() {
        if (this.props.activeForm === "expenseForm") {
            return <ExpenseForm/>
        } else if (this.props.activeForm === "transferForm") {
            return <TransferForm/>
        } else {
            return <IncomeForm/>
        }
    }

    renderTransferClass() {
        return `btn border ${this.props.activeForm === "transferForm" ? "active btn-secondary" : "btn-light"}`;
    }

    renderExpenseClass() {
        return `btn border ${this.props.activeForm === "expenseForm" ? "active btn-secondary" : "btn-light"}`;
    }

    renderIncomeClass() {
        return `btn border ${this.props.activeForm === "incomeForm" ? "active btn-secondary" : "btn-light"}`;
    }

    renderFormButtons() {
        return (
            <div className="btn-group btn-block mb-3" role="group" aria-label="Basic example">
                <button type="button" disabled={!this.props.isAdd} className={this.renderExpenseClass()}
                        onClick={() => this.getForm("expenseForm")}>Expense
                </button>
                <button type="button" disabled={!this.props.isAdd} className={this.renderTransferClass()}
                        onClick={() => this.getForm("transferForm")}>Transfer
                </button>
                <button type="button" disabled={!this.props.isAdd} className={this.renderIncomeClass()}
                        onClick={() => this.getForm("incomeForm")}>Income
                </button>
            </div>
        );
    }

    render() {
        return (
            <div className="card-body text-primary">
                {this.renderFormButtons()}
                {this.renderForm()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        activeForm: state.transaction.activeForm,
        isAdd: state.commons.add
    }
};

export default connect(mapStateToProps, {setActiveForm})(TransactionForm);

