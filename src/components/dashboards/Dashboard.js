import React from "react";
import NetWorth from "./NetWorth";
import NewTransaction from "./NewTransaction";
import RecentTransaction from "./RecentTransaction";

class Dashboard extends React.Component {
    render() {
        return (
            <div className="row mt-3">
                <NetWorth/>
                <div className="col-9">
                    <NewTransaction/>
                    <RecentTransaction/>
                </div>
            </div>
        );
    }
}

export default Dashboard;

