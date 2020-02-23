import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import connectToStores from 'alt-utils/lib/connectToStores';
import CurrentUserStore from '../../users/stores/current-user-store';
import ErrorBar from '../../components/error-bar';
import LoadingSpinner from '../../components/loading-spinner';
import NavBar from '../../components/navbar';
import PropTypes from 'prop-types';
import React, { lazy, Suspense } from 'react';

const ChangePassword = lazy(() => import('../../users/components/change-password'));
const CompleteRegistration = lazy(() => import('../../users/components/complete-registration'));
const DiveSite = lazy(() => import('../../dive-sites/components/dive-site'));
const DiveSites = lazy(() => import('../../dive-sites/components/dive-sites'));
const EmailTaken = lazy(() => import('./email-taken'));
const Forbidden = lazy(() => import('./forbidden'));
const Friends = lazy(() => import('../../friends/components/friends'));
const Home = lazy(() => import('./home'));
const Login = lazy(() => import('../../users/components/login'));
const LogEntry = lazy(() => import('../../dive-log/components/log-entry'));
const LogsList = lazy(() => import('../../dive-log/components/logs-list'));
const NotFound = lazy(() => import('./not-found'));
const Profile = lazy(() => import('../../users/components/profile'));
const ServerError = lazy(() => import('./server-error'));
const SignUp = lazy(() => import('../../users/components/sign-up'));
const Welcome = lazy(() => import('../../users/components/welcome'));

const spinner = <LoadingSpinner message="Loading page..." />;

class App extends React.Component {
	static getStores() {
		return [ CurrentUserStore ];
	}

	static getPropsFromStores() {
		return CurrentUserStore.getState();
	}

	renderRouter() {
		return (
			<Switch>
				<Route path="/" exact component={ Home } />
				<Route path="/signup" exact component={ SignUp } />
				<Route path="/login" exact component={ Login } />
				<Route path="/welcome" exact component={ Welcome } />
				<Route path="/diveSites" exact component={ DiveSites } />
				<Route path="/diveSites/new" exact component={ DiveSite } />
				<Route path="/diveSites/:siteId" exact component={ DiveSite } />
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
				<Route path="/emailTaken/:provider" exact component={ EmailTaken } />
				<Route path="/serverError" exact component={ ServerError } />
				<Route path="*" component={ NotFound } />
			</Switch>
		);
	}

	render() {
		const pageContent = this.props.currentUser.isRegistrationIncomplete
			? <CompleteRegistration />
			: this.renderRouter();

		return (
			<Router>
				<div>
					<NavBar />
					<ErrorBar />
					<div id="main-section">
						<Suspense fallback={ spinner }>
							{ pageContent }
						</Suspense>
						<hr />
						<p className="text-right"><small><em>Copyright &copy; Chris Carleton, 2019</em></small></p>
					</div>
				</div>
			</Router>);
	}
}

App.propTypes = {
	currentUser: PropTypes.object.isRequired
};

export default connectToStores(App);
