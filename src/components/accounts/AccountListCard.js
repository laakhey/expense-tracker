import React from "react";
import { connect } from 'react-redux';
import { openModal, fillAccountForm } from '../../actions';
import Utility from '../../Utility';

class AccountListCard extends React.Component {

    openModal() {
        this.fillAccountForm();
        this.props.openModal("edit");
    }

    fillAccountForm() {
        this.props.fillAccountForm({
            id: this.props.id,
            group: this.props.group,
            amount: this.props.amount,
            showOnDashboard: this.props.showOnDashboard,
            name: this.props.name
        });
    }

    renderEditButton() {
        return !this.props.hideEdit ? <button className="rounded-circle float-right border-0 mr-0 ml-2" onClick={() => this.openModal()}><i className="fa fa-pencil" aria-hidden="true" /></button> : "";
    }
    render() {
        return (
            <li className="list-group-item rounded-0">
                <span>{this.props.name}</span>
                {this.renderEditButton()}
                <span className={'float-right ' + Utility.showTextColor(this.props.amount)}>{this.props.amount} NPR</span>
            </li>
        );
    }
}

export default connect(null, { openModal, fillAccountForm })(AccountListCard);