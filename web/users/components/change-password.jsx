import agent from '../../agent';
import { Button } from 'react-bootstrap';
import config from '../../config';
import CurrentUserStore from '../stores/current-user-store';
import ErrorActions from '../../actions/error-actions';
import FormButtonGroup from '../../components/form-button-group';
import Formsy from 'formsy-react';
import handleError from '../../handle-error';
import PageTitle from '../../components/page-title';
import PropTypes from 'prop-types';
import React from 'react';
import RequireUser from '../../components/require-user';
import TextBox from '../../components/text-box';
import { withRouter } from 'react-router-dom';

class ChangePassword extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isWaiting: false };
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async handleSubmit(model, resetForm) {
		this.setState({ isWaiting: true });
		const { username } = CurrentUserStore.getState().currentUser;
		try {
			await agent
				.post(`/api/users/${ username }/changePassword`)
				.send({
					oldPassword: model.oldPassword,
					newPassword: model.newPassword
				});
			ErrorActions.showSuccess('Your password has been updated.');
			resetForm();
			this.setState({ isWaiting: false });
			document.getElementById('oldPassword').focus();
		} catch (err) {
			if (err.status === 403) {
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
		return (
			<div>
				<RequireUser />
				<PageTitle title="Change Password" />

				<Formsy onValidSubmit={ this.handleSubmit } className="form-horizontal">
					<TextBox
						controlId="oldPassword"
						label="Old password"
						name="oldPassword"
						required
						password
					/>
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
					<FormButtonGroup>
						<Button
							id="btn-change"
							bsStyle="primary"
							type="submit"
							disabled={ this.state.isWaiting }
						>
							Change Password
						</Button>
					</FormButtonGroup>
				</Formsy>
			</div>
		);
	}
}

ChangePassword.propTypes = {
	history: PropTypes.object.isRequired
};

export default withRouter(ChangePassword);
