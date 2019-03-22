import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ChangePassword from '../users/components/change-password';
import ErrorBar from './error-bar';
import Forbidden from '../components/forbidden';
import Home from './home';
import LogsList from '../dive-log/components/logs-list';
import LogEntry from '../dive-log/components/log-entry';
import NavBar from './navbar';
import NotFound from './not-found';
import SignUpPage from '../users/components/sign-up';
import Login from '../users/components/login';
import Profile from '../users/components/profile';
import React from 'react';

class App extends React.Component {
	render() {
		return (
			<Router>
				<div>
					<NavBar />
					<ErrorBar />
					<div id="main-section" className="container">
						<Switch>
							<Route path="/" exact component={ Home } />
							<Route path="/signup" exact component={ SignUpPage } />
							<Route path="/login" exact component={ Login } />
							<Route path="/changePassword" exact component={ ChangePassword } />
							<Route path="/profile" exact component={ Profile } />
							<Route path="/profile/:username" exact component={ Profile } />
							<Route path="/logs" exact component={ LogsList } />
							<Route path="/logs/:username" exact component={ LogsList } />
							<Route path="/logs/:username/new" exact component={ LogEntry } />
							<Route path="/logs/:username/:logId" exact component={ LogEntry } />
							<Route path="/forbidden" exact component={ Forbidden } />
							<Route path="/notFound" exact component={ NotFound } />
							<Route path="*" component={ NotFound } />
						</Switch>
						<hr />
						<p className="text-right"><small><em>Copyright &copy; Chris Carleton, 2019</em></small></p>
					</div>
				</div>
			</Router>);
	}
}

export default App;
