import React from "react";
import { NavLink } from "react-router-dom";

class Header extends React.Component {
    render() {
        return (
            <div className="row">
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <div className="container-fluid">
                        <a className="navbar-brand">UXCAM Expense Tracker</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink to="/expense-tracker/" className="nav-link" aria-current="page"><i className="fa fa-tachometer fa-lg"></i> Dashboard</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/expense-tracker/transactions" className="nav-link" aria-current="page"><i className="fa fa-exchange fa-lg"></i> Transactions</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/expense-tracker/accounts" className="nav-link" aria-current="page"><i className="fa fa-credit-card-alt fa-lg"></i> Accounts</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/expense-tracker/reports" className="nav-link" aria-current="page"><i className="fa fa-line-chart fa-lg"></i> Reports</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;

