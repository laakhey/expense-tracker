import React from "react";
import {connect} from 'react-redux';
import Utility from '../../Utility';


class TransactionCard extends React.Component {

    getAccountName(id) {
        return this.props.accountList.filter(a => a.id === Number(id))[0].name;
    }

    renderTags() {
        return this.props.tags.map(tag => {
            return <button key={tag} type="button" className="btn btn-sm btn-light mr-2">{tag}</button>
        })
    }

    renderExpense() {
        return (
            <div>
                <span className="text-secondary">{Utility.getFormatedDate(this.props.date)} </span>
                <span className={'text-dark ml-2 mr-3'}>{this.getAccountName(this.props.from)}</span>
                {this.props.tags.length > 0 || this.props.note ?
                    <i className="fa fa-arrow-right text-secondary mr-3" aria-hidden="true"/> : ""}
                {this.props.tags ? this.renderTags() : ""}
                {this.props.note ? <span className="text-secondary ml-2">{this.props.note}</span> : ""}
                <span className={'float-right text-danger'}>-{Number(this.props.amount).toFixed(2)} NPR</span>
            </div>
        );
    }

    renderIncome() {
        return (
            <div>
                <span className="text-secondary">{Utility.getFormatedDate(this.props.date)} </span>
                <span className={'text-dark ml-2 mr-3'}>{this.getAccountName(this.props.to)}</span>
                {this.props.tags.length > 0 || this.props.note ?
                    <i className="fa fa-arrow-left text-secondary mr-3" aria-hidden="true"/> : ""}
                {this.props.tags ? this.renderTags() : ""}
                {this.props.note ? <span className="text-secondary ml-2">{this.props.note}</span> : ""}
                <span className={'float-right text-success'}>{Number(this.props.amount).toFixed(2)} NPR</span>
            </div>
        );
    }

    renderTransfer() {
        return (
            <div>
                <span className="text-secondary">{Utility.getFormatedDate(this.props.date)} </span>
                <span className={'text-dark ml-2 mr-3'}>{this.getAccountName(this.props.from)}</span>
                <i className="fa fa-arrow-right text-secondary mr-3" aria-hidden="true"/>
                <span className={'text-dark ml-2'}>{this.getAccountName(this.props.to)}</span>
                {this.props.note ? <span className="text-secondary ml-3">{this.props.note}</span> : ""}
                <span className={'float-right text-dark'}>{Number(this.props.amount).toFixed(2)} NPR</span>
            </div>
        );
    }

    renderTransaction() {
        if (this.props.type === "expense") {
            return this.renderExpense();
        } else if (this.props.type === "income") {
            return this.renderIncome();
        } else {
            return this.renderTransfer();
        }
    }

    render() {
        return (
            <li className="list-group-item">{this.renderTransaction()}</li>
        );
    }
}


const mapStateToProps = state => {
    return {
        accountList: state.account.list,
    }
};

export default connect(mapStateToProps, {})(TransactionCard);