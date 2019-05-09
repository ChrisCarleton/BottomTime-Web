import {
	Breadcrumb,
	Modal,
	Nav,
	NavItem
} from 'react-bootstrap';
import connectToStores from 'alt-utils/lib/connectToStores';
import CurrentUserStore from '../../users/stores/current-user-store';
import FriendsActions from '../actions/friends-actions';
import FriendsStore from '../stores/friends-store';
import FriendsUtilities from '../util/friends-utilities';
import { LinkContainer } from 'react-router-bootstrap';
import LoadingSpinner from '../../components/loading-spinner';
import PageTitle from '../../components/page-title';
import ProfileCard from '../../users/components/profile-card';
import PropTypes from 'prop-types';
import React, { lazy, Suspense } from 'react';
import RequireUser from '../../components/require-user';
import { Route, Switch, withRouter } from 'react-router-dom';

const NewFriendRequestDialog = lazy(() => import('./new-friend-request-dialog'));
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
			const { currentUser, history } = this.props;

			await Promise.all([
				FriendsUtilities.refreshFriends(history, currentUser.username),
				FriendsUtilities.refreshFriendRequests(history, currentUser.username)
			]);
		}, 0);
	}

	render() {
		const {
			currentUser,
			profileCard,
			showNewFriendRequestDialog
		} = this.props;

		if (currentUser.isAnonymous) {
			return <RequireUser />;
		}

		return (
			<div>
				{ showNewFriendRequestDialog ? <NewFriendRequestDialog /> : null }
				<Modal show={ profileCard !== '' } onHide={ FriendsActions.hideProfileCard }>
					<Modal.Header closeButton>
						<Modal.Title>{ profileCard }</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<ProfileCard username={ profileCard } />
					</Modal.Body>
				</Modal>
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
	profileCard: PropTypes.string.isRequired,
	showNewFriendRequestDialog: PropTypes.bool.isRequired
};

export default withRouter(connectToStores(Friends));
