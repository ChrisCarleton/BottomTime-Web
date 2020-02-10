import {
	Alert,
	Button,
	ButtonGroup,
	ButtonToolbar,
	Checkbox,
	Glyphicon,
	Label,
	ListGroup,
	ListGroupItem
} from 'react-bootstrap';
import { Col, Row } from 'react-flexbox-grid';
import connectToStores from 'alt-utils/lib/connectToStores';
import CurrentUserStore from '../../users/stores/current-user-store';
import FriendsActions from '../actions/friends-actions';
import FriendsStore from '../stores/friends-store';
import FriendsUtilities from '../util/friends-utilities';
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

	renderListItem(relationship, index) {
		return (
			<ListGroupItem key={ index }>
				<Row>
					<Col sm={ 3 } md={ 1 }>
						<div className="text-center" style={ { width: '100%' } }>
							<Checkbox
								checked={ relationship.checked }
							/>
						</div>
					</Col>
					<Col sm={ 9 } md={ 11 }>
						<h4>{ relationship.friend }</h4>
						[
						<Link to={ `/logs/${ relationship.friend }` }>View Log Book</Link>
						&nbsp;|&nbsp;
						<Link to={ `/profile/${ relationship.friend }` }>View Profile</Link>
						]
					</Col>
				</Row>
			</ListGroupItem>
		);
	}

	renderList() {
		const { isLoadingFriends, friendsList } = this.props;

		if (isLoadingFriends) {
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
				{ friendsList.map(this.renderListItem) }
			</ListGroup>
		);
	}

	render() {
		const { currentUser, friendsList, history } = this.props;

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
						<Button
							id="btn-refresh-friends"
							onClick={ () => FriendsUtilities.refreshFriends(history, currentUser.username) }
						>
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
	isLoadingFriends: PropTypes.bool.isRequired
};

export default connectToStores(withRouter(FriendsList));
