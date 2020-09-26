import React from "react";

class AccountListCard extends React.Component {
    render() {
        return (
            <li className="list-group-item rounded-0">
                <span>{this.props.name}</span>
                <button className="rounded-circle float-right border-0 mr-0"><i className="fa fa-pencil" aria-hidden="true"></i></button>
                <span className={'float-right mr-2 ' + this.props.showTextColor(this.props.amount)}>{this.props.amount} NPR</span>
            </li>
        );
    }
}

export default AccountListCard;