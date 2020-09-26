import React from "react";
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { addAccount, openModal, closeModal } from '../../actions'
import CheckBox from "../html/CheckBox";
import Loading from "../html/Loading";
import Select from "../html/Select";
import Text from "../html/Text";
import TextGroup from "../html/TextGroup";
import Modal from "react-bootstrap/Modal";


class AccountForm extends React.Component {

    getAccountGroupList() {
        return this.props.accountList.map(group => {
            return {
                id: group.id,
                name: group.name
            }
        });
    }

    renderDelete() {
        return this.props.edit ? <button type="button" className="btn btn-danger" disabled={this.props.loading}>Delete  &nbsp; <Loading /></button> : "";
    }
    
    hideModal() {
        this.props.closeModal();
    }

    render() {
        return (
            <div>
                <Modal show={this.props.isModalOpen} onHide={this.hideModal} backdrop="static">
                    <Modal.Header>
                        <Modal.Title>{this.props.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form name="accountForm" onSubmit={this.props.handleSubmit(this.props.addAccount)}>
                            <div className="row mb-3">
                                <div className="col-7" >
                                    <Field component={Text} name="name" label="Account Name" required="true" />
                                </div>

                                <div className="col-5">
                                    <Field component={Select} name="accountGroup" label="Group" options={this.getAccountGroupList()} required="true" />
                                </div>
                            </div>
                            <div className="row mb-3" >
                                <div className="col-7">
                                    <div className="form-check amount-checkbox-margin-top" >
                                        <input className="form-check-input"
                                            type="checkbox"
                                            value="true"
                                            id="flexCheckDefault"
                                            checked disabled />
                                        <label className="form-check-label"
                                            htmlFor="flexCheckDefault" >
                                            Nepalese Rupees </label>
                                    </div>
                                </div>

                                <div className="col-5" >
                                    <Field component={TextGroup} name="amount" groupLabel="NPR" />
                                </div>
                            </div>
                            <div className="row mb-3 mt-3" >
                                <div className="col-7" >
                                    <Field component={CheckBox} name="showOnDashboard" label="Show On Dashboard" />
                                </div>

                                <div className="col-5" >
                                    <button type="submit"
                                        className="btn btn-primary btn-block" disabled={this.props.loading}> Save Account &nbsp; <Loading /></button>
                                </div>
                            </div>

                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-secondary" onClick={() => this.hideModal()}>Close</button>
                        {this.renderDelete()}
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
const validate = (formValues) => {
    console.log("form", formValues);
    const errors = {};
    if (!formValues.name) {
        errors.name = "Enter Account name"
    }
    if (!formValues.accountGroup || formValues.accountGroup === "0") {
        errors.accountGroup = "Select Account Group"
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
    console.log(errors);

    return errors;
};

const mapStateToProps = state => {
    return {
        accountList: state.account.list,
        loading: state.account.loading,
        isModalOpen: state.account.openModal
    }
};

const connectAccountForm = connect(mapStateToProps, { addAccount, closeModal, openModal })(AccountForm);
export default reduxForm({
    form: "accountForm",
    validate,
    enableReinitialize: true
})(connectAccountForm);