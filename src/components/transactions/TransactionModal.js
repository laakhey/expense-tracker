import React from "react";
import Loading from "../html/Loading";
import Modal from "react-bootstrap/Modal";
import TransactionForm from "./TransactionForm";
import {connect} from "react-redux";
import {closeModal, resetForm, setActiveForm, clearSelectedTags} from "../../actions";

class TransactionModal extends React.Component {

    renderDelete() {
        return !this.props.isAdd ?
            <button type="button" className="btn btn-danger" disabled={this.props.loading}>Delete  &nbsp; <Loading/>
            </button> : "";
    }

    hideModal() {
        this.props.closeModal();
        this.props.resetForm(this.props.activeForm)
        this.props.setActiveForm("expenseForm");
        this.props.clearSelectedTags();
    }

    renderModalTitle() {
        return this.props.isAdd ? "Add Transaction" : "Edit Transaction";
    }

    render() {
        return (
            <div>
                <Modal size="lg" show={this.props.isModalOpen} onHide={this.hideModal} keyboard={false}
                       backdrop="static">
                    <Modal.Header>
                        <Modal.Title>{this.renderModalTitle()}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="p-0">
                        <TransactionForm/>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-secondary" onClick={() => this.hideModal()}>Close
                        </button>
                        {this.renderDelete()}
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.commons.loading,
        isModalOpen: state.commons.openModal,
        isAdd: state.commons.add,
        activeForm: state.transaction.activeForm
    }
};


export default connect(mapStateToProps, {closeModal, resetForm, setActiveForm, clearSelectedTags})(TransactionModal);