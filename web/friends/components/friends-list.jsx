import agent from '../../agent';
import {
	Alert,
	Button,
	ButtonGroup,
	ButtonToolbar,
	Checkbox,
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
import LoadingSpinner from '../../components/loading-spinner';
import PropTypes from 'prop-types';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class FriendsList extends React.Component {
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
		this.handleRefresh = this.handleRefresh.bind(this);
	}

	async handleRefresh() {
		try {
			const response = await agent
				.get(`/api/users/${ this.props.currentUser.username }/friends`)
				.query({ type: 'friends' });
			FriendsActions.setFriendsList(response.body);
		} catch (err) {
			handleError(err, this.props.history);
		}
	}

	renderList() {
		const { isLoading, friendsList } = this.props;

		if (isLoading) {
			return <LoadingSpinner message="Getting your friends list..." />;
		}

		if (friendsList.length === 0) {
			return (
				<Alert bsStyle="info">
					<p>
						<Glyphicon glyph="exclamation-sign" />
						&nbsp;
						Sorry, but you have no dive buddies yet. Try clicking <strong>New Buddy Request</strong> above.
						One should never dive alone! ;)
					</p>
				</Alert>
			);
		}

		return (
			<ListGroup>
				{
					friendsList.map((r, i) => (
						<ListGroupItem key={ i }>
							<Row>
								<Col sm={ 3 } md={ 1 }>
									<div className="text-center" style={ { width: '100%' } }>
										<Checkbox
											checked={ r.checked }
										/>
									</div>
								</Col>
								<Col sm={ 9 } md={ 11 }>
									<h4>{ r.friend }</h4>
									[
									<Link to={ `/logs/${ r.friend }` }>View Log Book</Link>
									&nbsp;|&nbsp;
									<Link to={ `/profile/${ r.friend }` }>View Profile</Link>
									]
								</Col>
							</Row>
						</ListGroupItem>
					))
				}
			</ListGroup>
		);
	}

	render() {
		const { friendsList } = this.props;

		return (
			<div>
				<ButtonToolbar>
					<ButtonGroup>
						<Button
							id="btn-new-request"
							bsStyle="primary"
							onClick={ () => FriendsActions.setNewFriendRequestDialogVisible(true) }
						>
							New Buddy Request
						</Button>
					</ButtonGroup>

					<ButtonGroup>
						<Button id="btn-refresh-friends" onClick={ this.handleRefresh }>
							<Glyphicon glyph="refresh" />&nbsp;
							Refresh
						</Button>
					</ButtonGroup>
				</ButtonToolbar>
				<p>Showing <Label>{ friendsList.length }</Label> dive buddies.</p>
				{ this.renderList() }
			</div>
		);
	}
}

FriendsList.propTypes = {
	currentUser: PropTypes.object.isRequired,
	friendsList: PropTypes.array.isRequired,
	history: PropTypes.object.isRequired,
	isLoading: PropTypes.bool.isRequired
};

export default connectToStores(withRouter(FriendsList));
