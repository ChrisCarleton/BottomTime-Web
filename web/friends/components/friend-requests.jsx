import {
	Alert,
	Button,
	ButtonGroup,
	ButtonToolbar,
	Glyphicon,
	Label,
	ListGroup,
	ListGroupItem
} from 'react-bootstrap';
import { Col, Row } from 'react-flexbox-grid';
import connectToStores from 'alt-utils/lib/connectToStores';
import CurrentUserStore from '../../users/stores/current-user-store';
import DeclineFriendRequest from './decline-friend-request';
import FriendsActions from '../actions/friends-actions';
import FriendsStore from '../stores/friends-store';
import FriendsUtilities from '../util/friends-utilities';
import LoadingSpinner from '../../components/loading-spinner';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';

class FriendRequests extends React.Component {
	static getStores() {
		return [ CurrentUserStore, FriendsStore ];
	}

	static getPropsFromStores() {
		return {
			...FriendsStore.getState(),
			currentUser: CurrentUserStore.getState().currentUser
		};
	}

	constructor(props) {
		super(props);
		this.processFriendRequest = this.processFriendRequest.bind(this);
		this.handleSubmitDecline = this.handleSubmitDecline.bind(this);
		this.renderRequestItem = this.renderRequestItem.bind(this);
	}

	async processFriendRequest(index, approveOrDisapprove, reason) {
		const request = this.props.requestsToMe[index];
		const { currentUser, history } = this.props;

		await FriendsUtilities.processFriendRequest(
			history,
			request,
			approveOrDisapprove,
			reason
		);

		await Promise.all([
			FriendsUtilities.refreshFriendRequests(history, currentUser.username),
			FriendsUtilities.refreshFriends(history, currentUser.username)
		]);
	}

	renderRequestItem(request, index) {
		return (
			<ListGroupItem key={ index }>
				<Row>
					<Col sm={ 12 } md={ 7 }>
						<Button
							onClick={ () => FriendsActions.showProfileCard(request.user) }
							bsStyle="link"
						>
							{ request.user }
						</Button>
						<small>
							(requested { moment(request.requestedOn).local().fromNow() })
						</small>
					</Col>
					<Col sm={ 12 } md={ 5 }>
						<div className="text-right" style={ { width: '100%' } }>
							<Button
								bsStyle="success"
								onClick={ () => this.processFriendRequest(index, 'approve') }
								disabled={ request.reasonBoxIsVisible }
							>
								<Glyphicon glyph="ok" />
								&nbsp;
								Accept
							</Button>
							&nbsp;
							<Button
								bsStyle="danger"
								onClick={ () => FriendsActions.showReasonBox(index, true) }
								disabled={ request.reasonBoxIsVisible }
							>
								<Glyphicon glyph="remove" />
								&nbsp;
								Decline
							</Button>
						</div>
					</Col>
				</Row>
				{
					request.reasonBoxIsVisible
						? <DeclineFriendRequest index={ index } declineHandler={ this.processFriendRequest } />
						: null
				}
			</ListGroupItem>
		);
	}

	renderRequestsList() {
		const { isLoadingRequests, requestsToMe } = this.props;
		if (isLoadingRequests) {
			return <LoadingSpinner message="Getting dive buddy requests..." />;
		}

		if (requestsToMe.length === 0) {
			return (
				<Alert bsStyle="info">
					<p>
						<Glyphicon glyph="exclamation-sign" />&nbsp;
						No one is requesting to be your dive buddy at the moment. Check back later!
					</p>
				</Alert>
			);
		}

		return (
			<ListGroup>
				{ requestsToMe.map(this.renderRequestItem) }
			</ListGroup>
		);
	}

	render() {
		const { currentUser, history } = this.props;

		return (
			<div>
				<ButtonToolbar>
					<ButtonGroup>
						<Button
							bsStyle="primary"
							onClick={ () => FriendsActions.setNewFriendRequestDialogVisible(true) }
						>
							New Buddy Request
						</Button>
					</ButtonGroup>
					<ButtonGroup>
						<Button onClick={ () => FriendsUtilities.refreshFriendRequests(history, currentUser.username) }>
							<Glyphicon glyph="refresh" />
							&nbsp;
							Refresh
						</Button>
					</ButtonGroup>
				</ButtonToolbar>
				<p>You have <Label>{ this.props.requestsToMe.length }</Label> pending dive buddy requests.</p>
				{ this.renderRequestsList() }
			</div>
		);
	}
}

FriendRequests.propTypes = {
	currentUser: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	isLoadingRequests: PropTypes.bool.isRequired,
	requestsToMe: PropTypes.array.isRequired
};

export default withRouter(connectToStores(FriendRequests));
