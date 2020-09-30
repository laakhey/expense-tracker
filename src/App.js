import React, { Suspense } from 'react';
import Header from './components/Header'
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Transaction from './components/transactions/Transaction';
import Account from './components/accounts/Account';
import Report from './components/Report';
import Dashboard from './components/dashboards/Dashboard';
import Notification from './components/Notification';

function App() {
	return (
		<div className="App">
			<Router>
				<div className="container-fluid bg-light">
					<Header />
					<div className="row">
						<Suspense fallback={<div>Loading...</div>}>
							<Switch>
								<Route exact path="/expense-tracker/" component={Dashboard} />
								<Route exact path={"/expense-tracker/transactions"} component={Transaction} />
								<Route exact path={"/expense-tracker/accounts"} component={Account} />
								<Route exact path={"/expense-tracker/reports"} component={Report} />
							</Switch>
						</Suspense>
					</div>
				</div>
				<Notification />
			</Router>
		</div>
	);
}

export default App;
