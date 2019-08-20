import agent from '../../agent';
import { Button, Col, Row } from 'react-bootstrap';
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

				<p>
					Sign in with your username and password. <em>Coming soon: Sign in with Google, Twitter, etc.</em>
				</p>

				<Row>
					<Col smHidden mdOffset={ 2 } />
					<Col sm={ 12 } md={ 6 }>
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
