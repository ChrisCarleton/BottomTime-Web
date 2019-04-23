import agent from '../../agent';
import { Button, Modal } from 'react-bootstrap';
import CurrentUserStore from '../../users/stores/current-user-store';
import ErrorActions from '../../actions/error-actions';
import Formsy from 'formsy-react';
import FriendsActions from '../actions/friends-actions';
import handleError from '../../handle-error';
import PropTypes from 'prop-types';
import React from 'react';
import TextBox from '../../components/text-box';
import { withRouter } from 'react-router-dom';

const ConflictError
	= 'Could not create friend request! You are either already friends or a friend request already exists.';
const SelfFriendRequestError = 'You cannot send a friend request to yourself.';

class NewFriendRequestDialog extends React.Component {
	async handleSubmit(model, resetForm, invalidateForm) {
		const { currentUser } = CurrentUserStore.getState();
		const loweredQuery = model.query.toLowerCase();

		if (currentUser.username.toLowerCase() === loweredQuery) {
			invalidateForm({
				query: SelfFriendRequestError
			});
			return;
		}

		if (currentUser.email && currentUser.email.toLowerCase() === loweredQuery) {
			invalidateForm({
				query: SelfFriendRequestError
			});
			return;
		}

		try {
			const response = await agent
				.get('/api/search/users')
				.query({ query: model.query });

			if (response.body.length === 0) {
				invalidateForm({
					query: 'A user with a matching username or e-mail could not be found.'
				});
			} else {
				await agent.put(`/api/users/${ currentUser.username }/friends/${ response.body[0].username }`);
				FriendsActions.setNewFriendRequestDialogVisible(false);
				ErrorActions.showSuccess('Your dive buddy request has been sent!');
			}
		} catch (err) {
			if (err.response.status === 409) {
				invalidateForm({
					query: ConflictError
				});
				return;
			}

			FriendsActions.setNewFriendRequestDialogVisible(false);
			handleError(err, this.props.history);
		}
	}

	render() {
		return (
			<Modal.Dialog>
				<Formsy onValidSubmit={ this.handleSubmit } className="form-horizontal">
					<Modal.Header>
						<Modal.Title>New Dive Buddy Request</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<p>
							Enter the username or e-mail address of the user you would like to add to your
							list of dive buddies.
						</p>
						<TextBox
							autoFocus
							required
							controlId="query"
							name="query"
							label="User"
							maxLength={ 200 }
							onChange={ this.handleUserChanged }
							validations={ {
								isUsernameOrEmail: true
							} }
							validationErrors={ {
								isUsernameOrEmail: 'Must be a valid username or e-mail address'
							} }
							placeholder="Username or e-mail address"
						/>
					</Modal.Body>
					<Modal.Footer>
						<Button bsStyle="primary" type="submit">Create Request</Button>
						&nbsp;
						<Button
							onClick={ () => FriendsActions.setNewFriendRequestDialogVisible(false) }
						>
							Cancel
						</Button>
					</Modal.Footer>
				</Formsy>
			</Modal.Dialog>
		);
	}
}

NewFriendRequestDialog.propTypes = {
	history: PropTypes.object.isRequired
};

export default withRouter(NewFriendRequestDialog);
