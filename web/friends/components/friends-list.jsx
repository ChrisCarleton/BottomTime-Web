import agent from '../../agent';
import {
	Alert,
	Button,
	ButtonGroup,
	ButtonToolbar,
	Glyphicon,
	Label
} from 'react-bootstrap';
import FriendsActions from '../actions/friends-actions';
import handleError from '../../handle-error';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';

class FriendsList extends React.Component {
	componentDidMount() {
		setTimeout(async () => {
			try {
				FriendsActions.beginLoading();
				const response = await agent
					.get(`/api/users/${ this.props.username }/friends`)
					.query({ type: 'friends' });
				FriendsActions.setFriendsList(response.body);
			} catch (err) {
				FriendsActions.finishLoading();
				handleError(err, this.props.history);
			}
		}, 0);
	}

	renderList() {
		const { friendsList } = this.props;

		if (friendsList.length === 0) {
			return (
				<Alert bsStyle="info">
					<p>
						<Glyphicon glyph="exclamation-sign" />&nbsp;
						Sorry, but you have no dive buddies yet. Try clicking <strong>New Buddy Request</strong> above.
					</p>
					<p>
						<em>One should never dive alone! ;)</em>
					</p>
				</Alert>
			);
		}

		return null;
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
						<Button id="btn-refresh-friends">
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
	friendsList: PropTypes.array.isRequired,
	history: PropTypes.object.isRequired,
	username: PropTypes.string.isRequired
};

export default withRouter(FriendsList);
