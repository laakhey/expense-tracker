import React from "react";
import {connect} from 'react-redux';
import AccountGroupHeader from "../accounts/AccountGroupHeader";
import _ from 'lodash';

class NetWorth extends React.Component {

    renderList() {
        const showingList = this.props.accountList.filter(acc => acc.showOnDashboard);
        const groupList = _.chain(showingList).groupBy("group").map((value, key) => {
            return {
                "group": key,
                "accountList": value
            };
        }).value();
        return groupList.map(group => {
            group.hideEdit = true;
            return <AccountGroupHeader key={group.group}{...group} />;
        })
    }

    render() {
        return (
            <div className="col-3">
                <div className="card mb-3">
                    <div className="card-header">NET WORTH</div>
                    <div className="card-body text-primary pl-0 pr-0 pt-0 pb-0">
                        {this.renderList()}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        accountList: state.account.list
    }
};

export default connect(mapStateToProps, {})(NetWorth);

