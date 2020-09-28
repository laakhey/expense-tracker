import React from "react";
import Utility from "../../Utility";
import AccountListCard from "./AccountListCard";

class AccountGroupHeader extends React.Component {
    getTotalAmount() {
        let amount = 0;
        this.props.accountList.forEach(element => {
            amount += Number(element.amount);
        });
        return amount;
    }

    renderAccountList() {
        return this.props.accountList.map(account => {
            account.groupId = this.props.id;
            account.hideEdit = this.props.hideEdit;
            return <AccountListCard key={account.id} {...account} />
        });
    }
   
    render() {
        return (
            <div>
                <div className="card-header" >
                    <span>{this.props.group}</span>
                    <span className={'float-right font-weight-bold ' + Utility.showTextColor(this.getTotalAmount())}>{this.getTotalAmount()} NPR</span>
                </div>
                <ul className="list-group">
                    {this.renderAccountList()}
                </ul>
            </div>
        );
    }
}

export default AccountGroupHeader;