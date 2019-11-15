import agent from '../../agent';
import { Button } from 'react-bootstrap';
import config from '../../config';
import connectToStores from 'alt-utils/lib/connectToStores';
import CurrentUserActions from '../actions/current-user-actions';
import CurrentUserStore from '../stores/current-user-store';
import ErrorActions from '../../actions/error-actions';
import Formsy from 'formsy-react';
import PageTitle from '../../components/page-title';
import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import TextBox from '../../components/text-box';

class SignUpPage extends React.Component {
	static getStores() {
		return [ CurrentUserStore ];
	}

	static getPropsFromStores() {
		return CurrentUserStore.getState();
	}

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async handleSubmit(model, resetForm, invalidateForm) {
		try {
			const { body } = await agent
				.put(`/api/users/${ model.username }`)
				.send({
					email: model.email,
					password: model.password,
					role: 'user'
				});


			ErrorActions.showSuccess('Success!', 'Your new account has been created.');
			CurrentUserActions.loginSucceeded(body);
			return resetForm();
		} catch (err) {
			if (err.response && err.response.status === 409) {
				if (err.response.body.fieldName === 'username') {
					invalidateForm({ username: 'Username is already taken.' });
					return ErrorActions.showError('Unable to create account:', 'Username is already taken.');
				}

				invalidateForm({ email: 'Email address is already registered to another user.' });
				return ErrorActions.showError('Unable to create account:', 'Email is already taken.');
			}

			return ErrorActions.showError(err);
		}
	}

	handleInvalidSubmit() {
		ErrorActions.showError(
			'Invalid Information Entered',
			'There was a problem with some of the information that was entered. '
				+ 'See below for more details.'
		);
	}

	render() {
		if (!this.props.currentUser.isAnonymous) {
			return <Redirect to="/" />;
		}

		return (
			<div>
				<PageTitle title="Sign Up" />

				<p>Sign up to start logging your dives, meeting new dive buddies, and comparing logs!</p>

				<p>Sign up with Google/Twitter/Facebook/etc coming soon...</p>

				<p>
					Usernames must begin with a letter and contain only letters, numbers, underscores, dashes
					and periods. They must also be at least 5 characters long.
				</p>

				<p>Passwords must meet certain strength criteria. They must:</p>
				<ul>
					<li>Be at least 7 characters long.</li>
					<li>Contain at least one upper- and one lower-case letter</li>
					<li>Contain at least one number.</li>
					<li>Contain at least one special character. One of <code>!@#$%^&*.</code></li>
				</ul>

				<Formsy
					onValidSubmit={ this.handleSubmit }
					onInvalidSubmit={ this.handleInvalidSubmit }
				>
					<TextBox
						autoFocus
						controlId="username"
						label="User name"
						name="username"
						validations={ {
							matchRegexp: /^[a-z0-9_.-]+$/i,
							minLength: 5,
							maxLength: 50
						} }
						validationErrors={ {
							matchRegexp: 'User names can only contain letters, numbers, '
								+ 'underscores, periods, and dashes',
							minLength: 'User names must be at least 5 characters long.',
							maxLength: 'User names can be no more than 50 characters long.'
						} }
						maxLength={ 50 }
						required
					/>
					<TextBox
						controlId="email"
						label="Email"
						name="email"
						validations={ {
							isEmail: true
						} }
						validationErrors={ {
							isEmail: 'Not a valid e-mail address.'
						} }
						maxLength={ 70 }
						required
					/>
					<TextBox
						controlId="password"
						label="Password"
						name="password"
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
						maxLength={ 50 }
						password
						required
					/>
					<TextBox
						controlId="confirmPassword"
						label="Confirm password"
						name="confirmPassword"
						validations={ {
							equalsField: 'password'
						} }
						validationErrors={ {
							equalsField: 'Passwords do not match.'
						} }
						maxLength={ 50 }
						password
						required
					/>
					<Button
						id="btn-sign-up"
						bsStyle="primary"
						type="submit"
					>
						Sign Me Up!
					</Button>
				</Formsy>
			</div>
		);
	}
}

SignUpPage.propTypes = {
	currentUser: PropTypes.object.isRequired
};

export default connectToStores(SignUpPage);
