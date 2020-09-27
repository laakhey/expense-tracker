import React from "react";
import AccountForm from "./AccountForm";
import { connect } from 'react-redux';
import AccountGroupHeader from "../accounts/AccountGroupHeader";
import { openModal } from '../../actions';
import _ from 'lodash';

class Account extends React.Component {
    renderList() {
        const groupList = _.chain(this.props.accountList).groupBy("group").map((value, key) => {
            return {
                "group": key,
                "accountList": value
            };
        }).value();
        return groupList.map(group => {
            return <AccountGroupHeader key={group.group}{...group} />;
        })
    }

    openModal() {
        this.props.openModal("add");
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