import React from 'react';

import NavBar from './navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './home';
import LogsList from '../dive-log/components/logs-list';
import LogEntry from '../dive-log/components/log-entry';
import NotFound from './not-found';
import SignUpPage from '../users/components/sign-up';
import Login from '../users/components/login';

class App extends React.Component {
	render() {
		return (
			<Router>
				<div>
					<NavBar />
					<div id="main-section" className="container">
						<Switch>
							<Route path="/" exact component={ Home } />
							<Route path="/signup" exact component={ SignUpPage } />
							<Route path="/login" exact component={ Login } />
							<Route path="/logs" exact component={ LogsList } />
							<Route path="/logs/:username" exact component={ LogsList } />
							<Route path="/logs/:username/new" exact component={ LogEntry } />
							<Route path="/logs/:username/:logId" exact component={ LogEntry } />
							<Route path="*" component={ NotFound } />
						</Switch>
						<hr />
						<p><small><em>Copyright &copy; Chris Carleton, 2019</em></small></p>
					</div>
				</div>
			</Router>);
	}
}

export default App;
