import React from "react";
import AccountForm from "./AccountForm";
import { connect } from 'react-redux';
import AccountGroupHeader from "./AccountGroupHeader";
import { openModal } from '../../actions'

class Account extends React.Component {
    renderList() {
        return this.props.accountList.map(data => {
            return (data.accountList.length > 0) ? <AccountGroupHeader key={data.id}{...data} /> : "";
        })
    }

    openModal() {
        this.props.openModal()
    }

    render() {
        return (
            <div className="pl-0 pr-0">
                <div className="card" >
                    <div className="card-header" >
                        <div className="btn-group border"
                            role="group"
                            aria-label="Basic example" >
                            <button type="button"
                                className="btn btn-secondary"
                            > < i className="fa fa-plus"
                                aria-hidden="true"> </i></button >
                            <button type="button"
                                className="btn pr-4 pl-4"
                                onClick={() => this.openModal()}
                            > New </button>
                        </div>
                    </div>
                    <div className="card-body text-primary pl-0 pr-0 pt-0 pb-0" >
                        {this.renderList()}
                    </div>
                </div>
                <AccountForm title="New Account" />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        accountList: state.account.list,
        isModalOpen: state.account.openModal
    }
}

export default connect(mapStateToProps, { openModal })(Account);