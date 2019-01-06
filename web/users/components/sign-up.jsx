import agent from '../../agent';
import CurrentUserActions from '../actions/current-user-actions';
import CurrentUserStore from '../stores/current-user-store';
import ErrorActions from '../../actions/error-actions';
import ErrorBox from '../../components/error-box';
import Formsy from 'formsy-react';
import React from 'react';
import { Redirect } from 'react-router-dom';
import TextBox from '../../components/text-box';

import {
	Button,
	Col,
	Row
} from 'react-bootstrap';

class SignUpPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = CurrentUserStore.getState();

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleStoreChange = this.handleStoreChange.bind(this);
	}

	componentDidMount() {
		CurrentUserStore.listen(this.handleStoreChange);
	}

	componentWillUnmount() {
		CurrentUserStore.unlisten(this.handleStoreChange);
	}

	handleStoreChange() {
		this.setState(CurrentUserStore.getState());
	}

	handleSubmit(model, resetForm, invalidateForm) {
		agent
			.put(`/api/users/${ model.username }`)
			.send({
				email: model.email,
				password: model.password,
				role: 'user'
			})
			.then(res => {
				resetForm();
				CurrentUserActions.loginSucceeded(res);
			})
			.catch(err => {
				if (err.response.status === 409) {
					if (err.response.body.fieldName === 'username') {
						invalidateForm({ username: 'Username is already taken.' });
					} else {
						invalidateForm({ email: 'Email address is already registered to another user.' });
					}
				}

				ErrorActions.showError(err);
			});
	}

	handleInvalidSubmit() {
		ErrorActions.showError(
			'Invalid Information Entered',
			'There was a problem with some of the information that was entered. '
				+ 'See below for more details.'
		);
	}

	render() {
		if (this.state.currentUser && !this.state.currentUser.isAnonymous) {
			return <Redirect to="/" />;
		}

		return (
			<div>
				<h1>Sign Up</h1>

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

				<ErrorBox />

				<Formsy onValidSubmit={ this.handleSubmit } onInvalidSubmit={ this.handleInvalidSubmit }>
					<Row>
						<Col sm={ 12 }>
							<TextBox
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
								required
							/>
							<TextBox
								controlId="password"
								label="Password"
								name="password"
								validations={ {
									matchRegexp: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.]).*$/,
									minLength: 7,
									maxLength: 50
								} }
								validationErrors={ {
									matchRegexp: 'Password did not meet strength requirements. (See above!)',
									minLength: 'Password must be at least 7 characters long.',
									maxLength: 'Passwords can be no more than 50 characters long.'
								} }
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
								password
								required
							/>
						</Col>
					</Row>
					<Row>
						<Col smOffset={ 3 }>
							<Button
								id="btn-sign-up"
								bsStyle="primary"
								type="submit"
							>
								Sign Me Up!
							</Button>
						</Col>
					</Row>
				</Formsy>
			</div>
		);
	}
}

export default SignUpPage;
