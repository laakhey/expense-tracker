import React from "react";
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { addTransfer } from '../../actions';
import Loading from "../html/Loading";
import Select from "../html/Select";
import Date from "../html/Date";
import TextGroup from "../html/TextGroup";
import Text from "../html/Text";


class TransferForm extends React.Component {

    getAccountList() {
        return this.props.accountList.map(data => {
            data.value = data.id;
            data.label = data.name;
            return data;
        });
    }

    render() {
        return (
            <form name="transferForm" onSubmit={this.props.handleSubmit(this.props.addTransfer)}>
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
                        <Field component={Select} name="to" label="To" options={this.getAccountList()} required="true" />

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
                        <button type="submit" className="btn btn-primary btn-block" disabled={this.props.loading}> Save Transfer &nbsp; <Loading /></button>
                    </div>
                </div>
            </form>
        );
    }
}
const validate = (formValues) => {
    const errors = {};
    if (!formValues.from || formValues.from === "0") {
        errors.from = "Select From Account";
    }

    if (!formValues.to || formValues.to === "0") {
        errors.to = "Select To Account";
    }


    if (!formValues.amount) {
        errors.amount = "Enter amount.";
    }

    if (formValues.amount) {
        try {
            const amount = Number(formValues.amount);
            if (Object.is(NaN, amount)) {
                errors.amount = "Enter Valid Amount";
            }
        } catch (e) {
            errors.amount = "Enter Valid Amount";
        }
    }
    if (!formValues.date) {
        errors.date = "Enter date.";
    }
    if (formValues.from !== "0" && formValues.to !== "0" && formValues.from === formValues.to) {
        errors.from = "From and To account cannot be same";
    }
    return errors;
};

const mapStateToProps = state => {
    return {
        accountList: state.account.list
    }
};

const connectTransferForm = connect(mapStateToProps, { addTransfer })(TransferForm);
export default reduxForm({
    form: "transferForm",
    validate,
    enableReinitialize: true
})(connectTransferForm);