import React from "react";
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
            account.showTextColor = this.showTextColor;
            return <AccountListCard key={account.id} {...account} />
        });
    }
    showTextColor(amount) {
        return amount >= 0 ? "text-success" : "text-danger";
    }
    render() {
        return (
            <div>
                <div className="card-header" >
                    <span>{this.props.name}</span>
                    <span className={'float-right font-weight-bold ' + this.showTextColor(this.getTotalAmount())}>{this.getTotalAmount()} NPR</span>
                </div>
                <ul className="list-group">
                    {this.renderAccountList()}
                </ul>
            </div>
        );
    }
}

export default AccountGroupHeader;