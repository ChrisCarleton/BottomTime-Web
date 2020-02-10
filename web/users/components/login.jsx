import agent from '../../agent';
import { Button } from 'react-bootstrap';
import { Col, Row } from 'react-flexbox-grid';
import connectToStores from 'alt-utils/lib/connectToStores';
import CurrentUserActions from '../actions/current-user-actions';
import CurrentUserStore from '../stores/current-user-store';
import ErrorActions from '../../actions/error-actions';
import Formsy from 'formsy-react';
import handleError from '../../handle-error';
import PageTitle from '../../components/page-title';
import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import TextBox from '../../components/text-box';

require('../../styles/si-buttons.css');

class Login extends React.Component {
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

	async handleSubmit(model, resetForm) {
		try {
			const { body } = await agent.post('/api/auth/login').send(model);
			resetForm();
			CurrentUserActions.loginSucceeded(body);
		} catch (err) {
			if (err.response && err.response.status === 401) {
				ErrorActions.showError(
					'Login Failed',
					'Check your username and password and try again.');
			} else {
				handleError(err, this.props.history);
			}
		}
	}

	render() {
		if (!this.props.currentUser.isAnonymous) {
			return <Redirect to="/" />;
		}

		return (
			<div>
				<PageTitle title="Login" />
				<Row>
					<Col smHidden mdOffset={ 2 } />
					<Col sm={ 12 } md={ 6 }>
						<p>
							Sign in with your username and password.
						</p>
						<Formsy onValidSubmit={ this.handleSubmit }>
							<TextBox
								autoFocus
								controlId="username"
								label="Username"
								name="username"
								required
							/>
							<TextBox
								controlId="password"
								label="Password"
								name="password"
								password
								required
							/>
							<Button id="btn-login" bsStyle="primary" type="submit">Login</Button>
						</Formsy>
					</Col>
					<Col sm={ 12 } md={ 5 } mdOffset={ 1 }>
						<p>
							Or use one of the third-party providers below.
						</p>
						<a href="/api/auth/google">
							<Button id="btn-use-google" bsClass="btn-si btn-google">
								Sign in with Google
							</Button>
						</a>
					</Col>
				</Row>
			</div>
		);
	}
}

Login.propTypes = {
	currentUser: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired
};

export default withRouter(connectToStores(Login));
