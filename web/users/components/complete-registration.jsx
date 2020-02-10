import agent from '../../agent';
import { Button } from 'react-bootstrap';
import { Col, Row } from 'react-flexbox-grid';
import connectToStores from 'alt-utils/lib/connectToStores';
import CurrentUserActions from '../../users/actions/current-user-actions';
import CurrentUserStore from '../../users/stores/current-user-store';
import ErrorActions from '../../actions/error-actions';
import errorHandler from '../../components/error-handler';
import Formsy from 'formsy-react';
import PageTitle from '../../components/page-title';
import PropTypes from 'prop-types';
import RadioList from '../../components/radio-list';
import React from 'react';
import TextBox from '../../components/text-box';
import { withRouter } from 'react-router-dom';

class CompleteRegistration extends React.Component {
	static getStores() {
		return [ CurrentUserStore ];
	}

	static getPropsFromStores() {
		return CurrentUserStore.getState();
	}

	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
	}

	async onSubmit(model) {
		try {
			const { body } = await agent
				.post(`/api/users/${ this.props.currentUser.username }/completeRegistration`)
				.send(model);
			ErrorActions.showSuccess('Success!', 'Your new account has been created.');
			CurrentUserActions.loginSucceeded(body);
			this.props.history.push('/welcome');
		} catch (err) {
			this.props.handleError(err);
		}
	}

	onInvalidSubmit() {
		ErrorActions.showError(
			'There is a problem with the information you submitted.',
			'Please check the inputs below for errors.'
		);
	}

	render() {
		const { currentUser } = this.props;
		return (
			<div>
				<PageTitle title="Complete Registration" />
				<p>
					Hi there!
				</p>
				<p>
					Thanks for signing on to use our site! Please take a moment to complete your account
					registration. We just need a username and an e-mail address - everything else is
					optional.
				</p>
				<Formsy onValidSubmit={ this.onSubmit } onInvalidSubmit={ this.onInvalidSubmit }>
					<Row>
						<Col sm={ 12 } md={ 6 }>
							<h3>Your Profile</h3>
							<TextBox
								autoFocus
								name="username"
								controlId="username"
								label="Username"
								validations={ {
									matchRegexp: /^[a-z0-9_.-]+$/i,
									minLength: 5
								} }
								validationErrors={ {
									minLength: 'User names must be at least 5 characters long.',
									matchRegexp: 'User names can only contain letters, numbers, '
										+ 'underscores, periods, and dashes'
								} }
								maxLength={ 50 }
								required
							/>
							<TextBox
								name="email"
								controlId="email"
								label="Email address"
								value={ currentUser.email }
								validations={ { isEmail: true } }
								validationErrors={ {
									isEmail: 'Email address must be valid.'
								} }
								maxLength={ 70 }
								required
							/>
							<TextBox
								name="firstName"
								controlId="firstName"
								label="First name"
								maxLength={ 50 }
							/>
							<TextBox
								name="lastName"
								controlId="lastName"
								label="Last name"
								maxLength={ 50 }
							/>
						</Col>
						<Col sm={ 12 } md={ 6 }>
							<h3>Your Preferences</h3>
							<RadioList
								name="logsVisibility"
								controlId="logsVisibility"
								label="Log book visibility"
								value="friends-only"
								inline
							>
								{
									[
										{
											text: 'Friends-only',
											value: 'friends-only',
											title: 'Only your friends will be able to see your logs.'
										},
										{
											text: 'Private',
											value: 'private',
											title: 'Your log book will only be visible to you.'
										},
										{
											text: 'Public',
											value: 'public',
											title: 'Anyone will be able to view your log book.'
										}
									]
								}
							</RadioList>
							<RadioList
								name="weightUnit"
								controlId="weightUnit"
								label="Preferred weight unit"
								value="kg"
								inline
							>
								{
									[
										{
											text: 'Kilograms',
											value: 'kg'
										},
										{
											text: 'Pounds',
											value: 'lbs'
										}
									]
								}
							</RadioList>
							<RadioList
								name="distanceUnit"
								controlId="distanceUnit"
								label="Preferred depth / distance unit"
								value="m"
								inline
							>
								{
									[
										{
											text: 'Meters / kilometers',
											value: 'm'
										},
										{
											text: 'Feet / miles',
											value: 'ft'
										}
									]
								}
							</RadioList>
							<RadioList
								name="temperatureUnit"
								controlId="temperatureUnit"
								label="Preferred temperature unit"
								value="c"
								inline
							>
								{
									[
										{
											text: 'Celcius',
											value: 'c'
										},
										{
											text: 'Farenheit',
											value: 'f'
										}
									]
								}
							</RadioList>
							<RadioList
								name="pressureUnit"
								controlId="pressureUnit"
								label="Preferred pressure unit"
								value="bar"
								inline
							>
								{
									[
										{
											text: 'Bar',
											value: 'bar'
										},
										{
											text: 'PSI',
											value: 'psi'
										}
									]
								}
							</RadioList>
						</Col>
					</Row>
					<Row>
						<Col sm={ 12 }>
							<Button id="btn-complete-reg" bsStyle="primary" type="submit">Register</Button>
						</Col>
					</Row>
				</Formsy>
			</div>
		);
	}
}

CompleteRegistration.propTypes = {
	currentUser: PropTypes.object.isRequired,
	handleError: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired
};

export default errorHandler(connectToStores(withRouter(CompleteRegistration)));
