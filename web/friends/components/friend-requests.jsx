import agent from '../../agent';
import {
	Alert,
	Button,
	ButtonGroup,
	ButtonToolbar,
	Col,
	Glyphicon,
	Label,
	ListGroup,
	ListGroupItem,
	Row
} from 'react-bootstrap';
import FormButtonGroup from '../../components/form-button-group';
import connectToStores from 'alt-utils/lib/connectToStores';
import CurrentUserStore from '../../users/stores/current-user-store';
import ErrorActions from '../../actions/error-actions';
import FriendsActions from '../actions/friends-actions';
import FriendsStore from '../stores/friends-store';
import Formsy from 'formsy-react';
import handleError from '../../handle-error';
import HiddenField from '../../components/hidden-field';
import LoadingSpinner from '../../components/loading-spinner';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import TextBox from '../../components/text-box';
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
		this.refreshRequests = this.refreshRequests.bind(this);
		this.refreshFriends = this.refreshFriends.bind(this);
		this.processFriendRequest = this.processFriendRequest.bind(this);
		this.handleSubmitDecline = this.handleSubmitDecline.bind(this);
	}

	async refreshRequests() {
		try {
			FriendsActions.beginLoading();
			const response = await agent
				.get(`/api/users/${ this.props.currentUser.username }/friends`)
				.query({ type: 'requests-incoming' });

			FriendsActions.setRequestsList(response.body);
		} catch (err) {
			handleError(err, this.props.history);
		} finally {
			FriendsActions.finishLoading();
		}
	}

	async refreshFriends() {
		try {
			FriendsActions.beginLoading();
			const response = await agent
				.get(`/api/users/${ this.props.currentUser.username }/friends`)
				.query({ type: 'friends' });

			FriendsActions.setFriendsList(response.body);
		} catch (err) {
			handleError(err, this.props.history);
		} finally {
			FriendsActions.finishLoading();
		}
	}

	async processFriendRequest(index, approveOrDisapprove, reason) {
		const request = this.props.requestsToMe[index];

		try {
			await agent
				.post(`/api/users/${ request.user }/friends/${ request.friend }/${ approveOrDisapprove }`)
				.send({ reason });
			ErrorActions.showSuccess(
				`Dive buddy request has been ${ approveOrDisapprove === 'approve' ? 'approved' : 'declined' }.`);
			await this.refreshRequests();
			await this.refreshFriends();
		} catch (err) {
			handleError(err, this.props.history);
		}
	}

	async handleSubmitDecline(model) {
		await this.processFriendRequest(model.index, 'reject', model.reason);
	}

	renderDeclineForm(request, i) {
		if (!request.reasonBoxIsVisible) {
			return null;
		}

		return (
			<Row>
				<Col sm={ 12 }>
					<h4>Decline Buddy Request</h4>
					<p>
						{ 'You can optionally give a reason for declining the buddy request. (You don\'t have to!)' }
					</p>
					<Formsy onValidSubmit={ this.handleSubmitDecline } className="form-horizontal">
						<HiddenField controlId={ `index_${ i }` } name="index" value={ i } />
						<TextBox
							autoFocus
							controlId={ `reason_${ i }` }
							name="reason"
							label="Reason"
							maxLength={ 250 }
						/>
						<FormButtonGroup>
							<Button type="submit" bsStyle="primary">Ok</Button>
							&nbsp;
							<Button onClick={ () => FriendsActions.showReasonBox(i, false) }>Cancel</Button>
						</FormButtonGroup>
					</Formsy>
				</Col>
			</Row>
		);
	}

	renderRequestsList() {
		const { isLoading, requestsToMe } = this.props;
		if (isLoading) {
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
				{
					requestsToMe.map((r, i) => (
						<ListGroupItem key={ i }>
							<Row>
								<Col sm={ 12 } md={ 7 }>
									<Button
										onClick={ () => FriendsActions.showProfileCard(r.user) }
										bsStyle="link"
									>
										{ r.user }
									</Button>
									<small>
										(requested { moment(r.requestedOn).local().fromNow() })
									</small>
								</Col>
								<Col sm={ 12 } md={ 5 }>
									<div className="text-right" style={ { width: '100%' } }>
										<Button
											bsStyle="success"
											onClick={ () => this.processFriendRequest(i, 'approve') }
											disabled={ r.reasonBoxIsVisible }
										>
											<Glyphicon glyph="ok" />
											&nbsp;
											Accept
										</Button>
										&nbsp;
										<Button
											bsStyle="danger"
											onClick={ () => FriendsActions.showReasonBox(i, true) }
											disabled={ r.reasonBoxIsVisible }
										>
											<Glyphicon glyph="remove" />
											&nbsp;
											Decline
										</Button>
									</div>
								</Col>
							</Row>
							{ this.renderDeclineForm(r, i) }
						</ListGroupItem>
					))
				}
			</ListGroup>
		);
	}

	render() {
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
						<Button onClick={ this.refreshRequests }>
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
	isLoading: PropTypes.bool.isRequired,
	requestsToMe: PropTypes.array.isRequired
};

export default withRouter(connectToStores(FriendRequests));
