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
import connectToStores from 'alt-utils/lib/connectToStores';
import CurrentUserStore from '../../users/stores/current-user-store';
import FriendsActions from '../actions/friends-actions';
import FriendsStore from '../stores/friends-store';
import handleError from '../../handle-error';
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
		this.handleRefreshRequests = this.handleRefreshRequests.bind(this);
	}

	handleAcceptRequest(index) {
		console.log('Accept', index);
	}

	handleDeclineRequest(index) {
		console.log('Decline', index);
	}

	async handleRefreshRequests() {
		try {
			const response = await agent
				.get(`/api/users/${ this.props.currentUser.username }/friends`)
				.query({ type: 'requests-incoming' });

			FriendsActions.setRequestsList(response.body);
		} catch (err) {
			handleError(err, this.props.history);
		}
	}

	renderRequestsList() {
		const { requestsToMe } = this.props;
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
									<h4>
										<a href="#">{ r.user }</a>
										&nbsp;
										<small>
											(requested { moment(r.requestedOn).local().fromNow() })
										</small>
									</h4>
								</Col>
								<Col sm={ 12 } md={ 5 }>
									<div className="text-right" style={ { width: '100%' } }>
										<Button bsStyle="success" onClick={ () => this.handleAcceptRequest(i) }>
											<Glyphicon glyph="ok" />
											&nbsp;
											Accept
										</Button>
										&nbsp;
										<Button bsStyle="danger" onClick={ () => this.handleDeclineRequest(i) }>
											<Glyphicon glyph="remove" />
											&nbsp;
											Decline
										</Button>
									</div>
								</Col>
							</Row>
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
						<Button onClick={ this.handleRefreshRequests }>
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
	requestsToMe: PropTypes.array.isRequired
};

export default withRouter(connectToStores(FriendRequests));
