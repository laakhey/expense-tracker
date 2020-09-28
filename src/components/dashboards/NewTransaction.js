import React from "react";
import {connect} from 'react-redux';
import ExpenseForm from '../expenses/ExpenseForm'
import TransferForm from "../transfers/TransferForm";
import {setActiveForm} from "../../actions";
import IncomeForm from "../incomes/IncomeForm";

class NewTransaction extends React.Component {

    getForm(form) {
        this.props.setActiveForm(form);
    }

    renderForm() {
        if (this.props.activeForm === "expense") {
            return <ExpenseForm/>
        } else if (this.props.activeForm === "transfer") {
            return <TransferForm/>
        } else {
            return <IncomeForm/>
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

    render() {
        return (
            <div className="card mb-3">
                <div className="card-header">NEW TRANSACTION</div>
                <div className="card-body text-primary">
                    <div className="btn-group btn-block mb-3" role="group" aria-label="Basic example">
                        <button type="button" className={this.renderExpenseClass()}
                                onClick={() => this.getForm("expense")}>Expense
                        </button>
                        <button type="button" className={this.renderTransferClass()}
                                onClick={() => this.getForm("transfer")}>Transfer
                        </button>
                        <button type="button" className={this.renderIncomeClass()}
                                onClick={() => this.getForm("income")}>Income
                        </button>
                    </div>
                    {this.renderForm()}
                </div>
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

