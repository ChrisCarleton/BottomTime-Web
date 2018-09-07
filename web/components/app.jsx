import React from 'react';

import NavBar from './navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './home';
import LogsList from '../logs/components/logs-list';
import NotFound from './not-found';

class App extends React.Component {
	render() {
		return (
			<Router>
				<div>
					<NavBar />
					<div className="container lead">
						<Switch>
							<Route exact path="/" component={ Home } />
							<Route path="/logs" component={ LogsList } />
							<Route path="*" component={ NotFound } />
						</Switch>
					</div>
					<div className="container">
						<p><small>Copyright &copy; Chris Carleton, 2018</small></p>
					</div>
				</div>
			</Router>);
	}
}

export default App;
