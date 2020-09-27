import React from "react";
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { addExpense, addExpenseTag, setSelectedTags } from '../../actions';
import Loading from "../html/Loading";
import Select from "../html/Select";
import Date from "../html/Date";
import TextGroup from "../html/TextGroup";
import Text from "../html/Text";
import CreatableSelect from 'react-select/creatable';


class ExpenseForm extends React.Component {

    handleChange = (newValue, actionMeta) => {
        this.props.setSelectedTags(newValue);
        if (actionMeta.action === "create-option") {
            this.props.addExpenseTag(newValue[newValue.length - 1]);
        }
        this.setState({ selectedTags: newValue });
    };

    getAccountList() {
        return this.props.accountList.map(data => {
            data.value = data.id;
            data.label = data.name;
            return data;
        });
    }

    render() {
        return (
            <form name="expenseForm" onSubmit={this.props.handleSubmit(this.props.addExpense)}>
                <div className="row mb-3 mt-3">
                    <div className="col-9">
                        <Field component={Select} name="from" label="From" options={this.getAccountList()} required="true" />

                    </div>

                    <div className="col-3">
                        <div className="amount-margin-top">
                            <Field component={TextGroup} name="amount" groupLabel="NPR" />
                        </div>
                    </div>
                </div>

                <div className="row mb-3 mt-3">
                    <div className="col-9">
                        <label className="form-label">Tags</label>
                        <CreatableSelect
                            isMulti
                            onChange={this.handleChange}
                            options={this.props.tags}
                        />

                    </div>

                    <div className="col-3">
                        <div className="amount-margin-top">
                            <Field component={Date} name="date" required="true" />
                        </div>
                    </div>
                </div>
                <div className="row mb-3 mt-3">
                    <div className="col-9">
                        <Field component={Text} name="note" hasLabel={false} placeholder="Note" />
                    </div>

                    <div className="col-3">
                        <button type="submit" className="btn btn-primary btn-block" disabled={this.props.loading}> Add Expense &nbsp; <Loading /></button>
                    </div>
                </div>
            </form>
        );
    }
}
const validate = (formValues) => {
    const errors = {};
    if (!formValues.from || formValues.from === "0") {
        errors.from = "Enter From Account"
    }

    if (!formValues.amount) {
        errors.amount = "Enter amount."
    }

    if (formValues.amount) {
        try {
            const amount = Number(formValues.amount);
            console.log(amount);
            if (Object.is(NaN, amount)) {
                errors.amount = "Enter Valid Amount"
            }
        } catch (e) {
            errors.amount = "Enter Valid Amount"
        }
    }
    if (!formValues.date) {
        errors.date = "Enter date."
    }
    return errors;
};

const mapStateToProps = state => {
    return {
        accountList: state.account.list,
        tags: state.transaction.expenseTags
    }
};

const connectExpenseForm = connect(mapStateToProps, { addExpense, addExpenseTag, setSelectedTags })(ExpenseForm);
export default reduxForm({
    form: "expenseForm",
    validate,
    enableReinitialize: true
})(connectExpenseForm);