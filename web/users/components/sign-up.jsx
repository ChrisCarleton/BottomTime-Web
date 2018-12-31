import agent, { makeAbsoluteUri } from '../../agent';
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
			.put(makeAbsoluteUri(`/users/${ model.username }`))
			.send({
				email: model.email,
				password: model.password,
				role: 'user'
			})
			.then(res => {
				resetForm();
				console.log(JSON.stringify(res));
				CurrentUserActions.loginSucceeded(res);
			})
			.catch(err => {
				if (err.response.status === 409) {
					if (err.response.body.fieldName === 'username') {
						return invalidateForm({ username: 'Username is already taken.' });
					}

					return invalidateForm({ email: 'Email address is already registered to another user.' });
				}
				ErrorActions.showError(err);
			});
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

				<ErrorBox />

				<Formsy onValidSubmit={ this.handleSubmit }>
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
						<Col smOffset={ 3 }>
							<Button
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
