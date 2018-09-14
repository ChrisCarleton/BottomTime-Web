import React from 'react';

import NavBar from './navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './home';
import LogsList from '../dive-log/components/logs-list';
import LogEntry from '../dive-log/components/log-entry';
import NotFound from './not-found';

class App extends React.Component {
	render() {
		return (
			<Router>
				<div>
					<NavBar />
					<div id="main-section" className="container">
						<Switch>
							<Route path="/" exact component={ Home } />
							<Route path="/logs" exact component={ LogsList } />
							<Route path="/logs/new" exact component={ LogEntry } />
							<Route path="*" component={ NotFound } />
						</Switch>
					</div>
					<div className="container">
						<hr />
						<p><small>Copyright &copy; Chris Carleton, 2018</small></p>
					</div>
				</div>
			</Router>);
	}
}

export default App;
