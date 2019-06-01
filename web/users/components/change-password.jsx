import agent from '../../agent';
import { Button } from 'react-bootstrap';
import config from '../../config';
import connectToStores from 'alt-utils/lib/connectToStores';
import CurrentUserStore from '../stores/current-user-store';
import ErrorActions from '../../actions/error-actions';
import Formsy from 'formsy-react';
import handleError from '../../handle-error';
import PageTitle from '../../components/page-title';
import PropTypes from 'prop-types';
import React from 'react';
import RequireUser from '../../components/require-user';
import TextBox from '../../components/text-box';
import { withRouter } from 'react-router-dom';

class ChangePassword extends React.Component {
	static getStores() {
		return [ CurrentUserStore ];
	}

	static getPropsFromStores() {
		return CurrentUserStore.getState();
	}

	constructor(props) {
		super(props);
		this.state = { isWaiting: false };
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async handleSubmit(model, resetForm) {
		const { hasPassword, username } = this.props.currentUser;
		delete model.confirmPassword;
		this.setState({ isWaiting: true });

		try {
			await agent
				.post(`/api/users/${ username }/changePassword`)
				.send(model);
			ErrorActions.showSuccess('Your password has been updated.');
			resetForm();
			this.setState({ isWaiting: false });
			document.getElementById(hasPassword ? 'oldPassword' : 'newPassword').focus();
		} catch (err) {
			if (err.response.status === 403) {
				ErrorActions.showError(
					'Unable to change password',
					'Check your old password and try again.');
				resetForm();
				this.setState({ isWaiting: false });
				document.getElementById('oldPassword').focus();
			} else {
				handleError(err, this.props.history);
			}
		}
	}

	render() {
		const { hasPassword } = this.props.currentUser;

		return (
			<div>
				<RequireUser />
				<PageTitle title="Change Password" />

				<Formsy onValidSubmit={ this.handleSubmit }>
					{
						hasPassword
							? (
								<TextBox
									controlId="oldPassword"
									label="Old password"
									name="oldPassword"
									required
									password
								/>
							)
							: null
					}
					<TextBox
						controlId="newPassword"
						label="New password"
						name="newPassword"
						validations={ {
							matchRegexp: config.passwordRegex,
							minLength: 7,
							maxLength: 50
						} }
						validationErrors={ {
							matchRegexp: 'Password did not meet strength requirements. (See above!)',
							minLength: 'Password must be at least 7 characters long.',
							maxLength: 'Passwords can be no more than 50 characters long.'
						} }
						required
						password
					/>
					<TextBox
						controlId="confirmPassword"
						label="Confirm password"
						name="confirmPassword"
						validations={ {
							equalsField: 'newPassword'
						} }
						validationErrors={ {
							equalsField: 'Passwords do not match.'
						} }
						required
						password
					/>
					<Button
						id="btn-change"
						bsStyle="primary"
						type="submit"
						disabled={ this.state.isWaiting }
					>
						Change Password
					</Button>
				</Formsy>
			</div>
		);
	}
}

ChangePassword.propTypes = {
	currentUser: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired
};

export default withRouter(connectToStores(ChangePassword));
