import React from "react";
import { connect } from 'react-redux';
import { openModal, fillAccountForm  } from '../../actions';

class AccountListCard extends React.Component {

    openModal() {
        this.fillAccountForm();
        this.props.openModal("edit");
    }

    fillAccountForm(){
        this.props.fillAccountForm({
            id: this.props.id,
            group: this.props.group,
            amount: this.props.amount,
            showOnDashboard: this.props.showOnDashboard,
            name: this.props.name
        });
    }

    render() {
        console.log(this.props);
        return (
            <li className="list-group-item rounded-0">
                <span>{this.props.name}</span>
                <button className="rounded-circle float-right border-0 mr-0" onClick={()=> this.openModal()}><i className="fa fa-pencil" aria-hidden="true"></i></button>
                <span className={'float-right mr-2 ' + this.props.showTextColor(this.props.amount)}>{this.props.amount} NPR</span>
            </li>
        );
    }
}

const mapStateToProps = state => {
    return {}
}

export default connect(mapStateToProps, { openModal, fillAccountForm })(AccountListCard);