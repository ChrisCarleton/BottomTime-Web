import agent from '../../agent';
import {
	Breadcrumb,
	Nav,
	NavItem
} from 'react-bootstrap';
import connectToStores from 'alt-utils/lib/connectToStores';
import CurrentUserStore from '../../users/stores/current-user-store';
import FriendsActions from '../actions/friends-actions';
import FriendsStore from '../stores/friends-store';
import handleError from '../../handle-error';
import { LinkContainer } from 'react-router-bootstrap';
import LoadingSpinner from '../../components/loading-spinner';
import NewFriendRequestDialog from './new-friend-request-dialog';
import PageTitle from '../../components/page-title';
import PropTypes from 'prop-types';
import React, { lazy, Suspense } from 'react';
import RequireUser from '../../components/require-user';
import { Route, Switch, withRouter } from 'react-router-dom';

const FriendsList = lazy(() => import('./friends-list'));
const FriendRequests = lazy(() => import('./friend-requests'));
const Spinner = <LoadingSpinner message="Loading..." />;

class Friends extends React.Component {
	static getStores() {
		return [ CurrentUserStore, FriendsStore ];
	}

	static getPropsFromStores() {
		return {
			currentUser: CurrentUserStore.getState().currentUser,
			...FriendsStore.getState()
		};
	}

	componentDidMount() {
		setTimeout(async () => {
			const url = `/api/users/${ this.props.currentUser.username }/friends`;
			try {
				const [ friendsResponse, requestsResponse ] = await Promise.all([
					agent.get(url).query({ type: 'friends' }),
					agent.get(url).query({ type: 'requests-incoming' })
				]);
				FriendsActions.setFriendsList(friendsResponse.body);
				FriendsActions.setRequestsList(requestsResponse.body);
				FriendsActions.finishLoading();
			} catch (err) {
				FriendsActions.finishLoading();
				handleError(err, this.props.history);
			}
		}, 0);
	}

	renderNewFriendRequestDialog() {
		if (this.props.showNewFriendRequestDialog) {
			return <NewFriendRequestDialog />;
		}

		return null;
	}

	render() {
		if (this.props.currentUser.isAnonymous) {
			return <RequireUser />;
		}

		return (
			<div>
				{ this.renderNewFriendRequestDialog() }
				<Breadcrumb>
					<LinkContainer to="/">
						<Breadcrumb.Item>Home</Breadcrumb.Item>
					</LinkContainer>
					<Breadcrumb.Item active>Dive Buddies</Breadcrumb.Item>
				</Breadcrumb>
				<PageTitle title="My Dive Buddies" />
				<Nav bsStyle="tabs">
					<LinkContainer to="/friends">
						<NavItem>Dive Buddies</NavItem>
					</LinkContainer>
					<LinkContainer to="/friendRequests">
						<NavItem>Dive Buddy Requests</NavItem>
					</LinkContainer>
				</Nav>
				<Suspense fallback={ Spinner }>
					<Switch>
						<Route path="/friends" exact component={ FriendsList } />
						<Route path="/friendRequests" exact component={ FriendRequests } />
					</Switch>
				</Suspense>
			</div>
		);
	}
}

Friends.propTypes = {
	currentUser: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	showNewFriendRequestDialog: PropTypes.bool.isRequired
};

export default withRouter(connectToStores(Friends));
