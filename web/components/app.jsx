import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ErrorBar from './error-bar';
import LoadingSpinner from './loading-spinner';
import NavBar from './navbar';
import React, { lazy, Suspense } from 'react';

const ChangePassword = lazy(() => import('../users/components/change-password'));
const Forbidden = lazy(() => import('./forbidden'));
const Friends = lazy(() => import('../friends/components/friends'));
const Home = lazy(() => import('./home'));
const Login = lazy(() => import('../users/components/login'));
const LogEntry = lazy(() => import('../dive-log/components/log-entry'));
const LogsList = lazy(() => import('../dive-log/components/logs-list'));
const NotFound = lazy(() => import('./not-found'));
const Profile = lazy(() => import('../users/components/profile'));
const SignUp = lazy(() => import('../users/components/sign-up'));

const spinner = <LoadingSpinner message="Loading..." />;

class App extends React.Component {
	render() {
		return (
			<Router>
				<div>
					<NavBar />
					<ErrorBar />
					<div id="main-section" className="container">
						<Suspense fallback={ spinner }>
							<Switch>
								<Route path="/" exact component={ Home } />
								<Route path="/signup" exact component={ SignUp } />
								<Route path="/login" exact component={ Login } />
								<Route path="/friends" exact component={ Friends } />
								<Route path="/friendRequests" exact component={ Friends } />
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
						</Suspense>
						<hr />
						<p className="text-right"><small><em>Copyright &copy; Chris Carleton, 2019</em></small></p>
					</div>
				</div>
			</Router>);
	}
}

export default App;
