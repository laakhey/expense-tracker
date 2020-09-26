import React from "react";
import { NavLink } from "react-router-dom";

class Header extends React.Component {
    render() {
        return (
            <div className="row">
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">UXCAM Expense Tracker</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink to="/" className="nav-link" aria-current="page" href="#"><i className="fa fa-tachometer fa-lg"></i> Dashboard</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/transactions" className="nav-link" aria-current="page" href="#"><i className="fa fa-exchange fa-lg"></i> Transactions</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/accounts" className="nav-link" aria-current="page" href="#"><i className="fa fa-credit-card-alt fa-lg"></i> Accounts</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/resports" className="nav-link" aria-current="page" href="#"><i className="fa fa-line-chart fa-lg"></i> Reports</NavLink>
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

