import React from "react";

import ExpenseForm from '../components/expenses/ExpenseForm'

class Dashboard extends React.Component {


    render() {
        return (
            <div className="row mt-3">
                <div className="col-3">
                    <div className="card mb-3">
                        <div className="card-header">New Transaction</div>
                        <div className="card-body text-primary pl-0 pr-0 pt-0 pb-0">
                            <div className="accordion" id="accordionExample">
                                <div className="card">
                                    <div className="card-header" id="headingOne">
                                        <h2 className="mb-0">
                                            <button className="btn btn-link btn-block text-left" type="button" data-toggle="collapse" href="#collapseOne" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                Collapsible Group Item #1
                                    </button>
                                        </h2>
                                    </div>

                                    <div id="collapseOne" className="collapse multi-collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                        <div className="card-body">
                                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="headingTwo">
                                        <h2 className="mb-0">
                                            <button className="btn btn-link btn-block text-left" href="#collapseTwo" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                Collapsible Group Item #2
                                    </button>
                                        </h2>
                                    </div>
                                    <div id="collapseTwo" className="collapse  multi-collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                        <div className="card-body">
                                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="headingThree">
                                        <h2 className="mb-0">
                                            <button className="btn btn-link btn-block text-left" href="#collapseThree" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                Collapsible Group Item #3
                                    </button>
                                        </h2>
                                    </div>
                                    <div id="collapseThree" className="collapse  multi-collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                                        <div className="card-body">
                                            raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-9">
                    <div className="card mb-3">
                        <div className="card-header">New Transaction</div>
                        <div className="card-body text-primary">
                            <div className="btn-group btn-block mb-3" role="group" aria-label="Basic example">
                                <button type="button" className="btn btn-light border">Expense</button>
                                <button type="button" className="btn btn-light border">Transfer</button>
                                <button type="button" className="btn btn-light border">Income</button>
                            </div>
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Expense</a>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Transfer</a>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <a className="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Income</a>
                                </li>
                            </ul>
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                                    <ExpenseForm />
                                </div>
                                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <form>
                                        <div className="row mb-3 mt-3">
                                            <div className="col-9">
                                                <label htmlFor="from" className="form-label">From</label>
                                                <select className="form-select" aria-label="Default select example" id="from">
                                                    <option value="1">My Cash</option>
                                                    <option value="2">Bank</option>
                                                    <option value="3">Other Cash</option>
                                                </select>
                                            </div>

                                            <div className="col-3">
                                                <div className="input-group amount-margin-top">
                                                    <input type="text" id="amount" className="form-control" />
                                                    <span className="input-group-text" id="basic-addon2">NPR</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mb-3 mt-3">
                                            <div className="col-9">
                                                <label htmlFor="to" className="form-label">To</label>
                                                <select className="form-select" aria-label="Default select example" id="to">
                                                    <option value="1">My Cash</option>
                                                    <option value="2">Bank</option>
                                                    <option value="3">Other Cash</option>
                                                </select>
                                            </div>

                                            <div className="col-3">
                                                <div className="input-group amount-margin-top">
                                                    <input type="date" className="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mb-3 mt-3">
                                            <div className="col-9">
                                                <input type="text" className="form-control" id="note" placeholder="Note" />
                                            </div>

                                            <div className="col-3">
                                                <button type="submit" className="btn btn-primary btn-block">Add Transfer</button>
                                            </div>
                                        </div>

                                    </form>
                                </div>
                                <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                                    <form>
                                        <div className="row mb-3 mt-3">
                                            <div className="col-9">
                                                <label htmlFor="to" className="form-label">To</label>
                                                <select className="form-select" aria-label="Default select example" id="to">
                                                    <option value="1">My Cash</option>
                                                    <option value="2">Bank</option>
                                                    <option value="3">Other Cash</option>
                                                </select>
                                            </div>

                                            <div className="col-3">
                                                <div className="input-group amount-margin-top">
                                                    <input type="text" id="amount" className="form-control" />
                                                    <span className="input-group-text" id="basic-addon2">NPR</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mb-3 mt-3">
                                            <div className="col-9">
                                                <label htmlFor="tags" className="form-label">Tags</label>
                                                <input type="text" className="form-control" id="tags" />
                                            </div>

                                            <div className="col-3">
                                                <div className="input-group amount-margin-top">
                                                    <input type="date" className="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mb-3 mt-3">
                                            <div className="col-9">
                                                <input type="text" className="form-control" id="note" placeholder="Note" />
                                            </div>

                                            <div className="col-3">
                                                <button type="submit" className="btn btn-primary btn-block">Add Income</button>
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card mb-3">
                        <div className="card-header">Recent Transactions</div>
                        <div className="card-body text-primary pl-0 pr-0 pt-0 pb-0">
                            <ul className="list-group">
                                <li className="list-group-item">Cras justo odio</li>
                                <li className="list-group-item">Dapibus ac facilisis in</li>
                                <li className="list-group-item">Morbi leo risus</li>
                                <li className="list-group-item">Porta ac consectetur ac</li>
                                <li className="list-group-item">Vestibulum at eros</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Dashboard;

