import connectToStores from 'alt-utils/lib/connectToStores';
import Formsy from 'formsy-react';
import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import CurrentUserActions from '../actions/current-user-actions';
import CurrentUserStore from '../stores/current-user-store';
import TextBox from '../../components/text-box';

import {
	Button,
	Col,
	Row
} from 'react-bootstrap';

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

	handleSubmit(model) {
		CurrentUserActions.login(model);
	}

	render() {
		if (this.props.currentUser && !this.props.currentUser.isAnonymous) {
			return <Redirect to="/" />;
		}

		return (
			<div>
				<h1>Login</h1>

				<p>
					Sign in with your username and password. <em>Coming soon: Sign in with Google, Twitter, etc.</em>
				</p>

				<Formsy onValidSubmit={ this.handleSubmit }>
					<Row>
						<Col sm={ 12 }>
							<TextBox
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
						</Col>
					</Row>
					<Row>
						<Col smOffset={ 3 }>
							<Button id="btn-login" bsStyle="primary" type="submit">Login</Button>
						</Col>
					</Row>
				</Formsy>
			</div>
		);
	}
}

Login.propTypes = {
	currentUser: PropTypes.object.isRequired
};

export default connectToStores(Login);
