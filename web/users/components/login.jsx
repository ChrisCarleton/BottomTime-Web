import { Button } from 'react-bootstrap';
import connectToStores from 'alt-utils/lib/connectToStores';
import FormButtonGroup from '../../components/form-button-group';
import Formsy from 'formsy-react';
import PageTitle from '../../components/page-title';
import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import CurrentUserActions from '../actions/current-user-actions';
import CurrentUserStore from '../stores/current-user-store';
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

	handleSubmit(model) {
		CurrentUserActions.login(model, this.props.history);
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

				<Formsy onValidSubmit={ this.handleSubmit } className="form-horizontal">
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
					<FormButtonGroup>
						<Button id="btn-login" bsStyle="primary" type="submit">Login</Button>
					</FormButtonGroup>
				</Formsy>
			</div>
		);
	}
}

Login.propTypes = {
	currentUser: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired
};

export default withRouter(connectToStores(Login));
