import {
	Breadcrumb,
	Tab,
	Tabs
} from 'react-bootstrap';
import connectToStores from 'alt-utils/lib/connectToStores';
import CurrentUserStore from '../../users/stores/current-user-store';
import FriendsStore from '../stores/friends-store';
import { LinkContainer } from 'react-router-bootstrap';
import LoadingSpinner from '../../components/loading-spinner';
import NewFriendRequestDialog from './new-friend-request-dialog';
import PageTitle from '../../components/page-title';
import PropTypes from 'prop-types';
import React, { lazy, Suspense } from 'react';
import RequireUser from '../../components/require-user';

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
				<Tabs id="friends-tabs" defaultActiveKey={ 0 }>
					<Tab eventKey={ 0 } title="Dive Buddies">
						<Suspense fallback={ Spinner }>
							<FriendsList
								friendsList={ this.props.friendsList }
								username={ this.props.currentUser.username }
							/>
						</Suspense>
					</Tab>
					<Tab eventKey={ 1 } title="Dive Buddy Requests">
						<Suspense fallback={ Spinner }>
							<FriendRequests />
						</Suspense>
					</Tab>
				</Tabs>
			</div>
		);
	}
}

Friends.propTypes = {
	friendsList: PropTypes.array.isRequired,
	currentUser: PropTypes.object.isRequired,
	showNewFriendRequestDialog: PropTypes.bool.isRequired
};

export default connectToStores(Friends);
