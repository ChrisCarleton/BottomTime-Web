import ErrorBox from '../../components/error-box';
import Formsy from 'formsy-react';
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
	constructor(props) {
		super(props);
		this.state = CurrentUserStore.getState();
		this.handleStoreChanged = this.handleStoreChanged.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		CurrentUserStore.listen(this.handleStoreChanged);
	}

	componentWillUnmount() {
		CurrentUserStore.unlisten(this.handleStoreChanged);
	}

	handleStoreChanged() {
		this.setState(CurrentUserStore.getState());
	}

	handleSubmit(model) {
		CurrentUserActions.login(model);
	}

	render() {
		if (this.state.currentUser && !this.state.currentUser.isAnonymous) {
			return <Redirect to="/" />;
		}

		return (
			<div>
				<h1>Login</h1>

				<p>
					Sign in with your username and password. <em>Coming soon: Sign in with Google, Twitter, etc.</em>
				</p>

				<ErrorBox />

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
							<Button bsStyle="primary" type="submit">Login</Button>
						</Col>
					</Row>
				</Formsy>
			</div>
		);
	}
}

export default Login;
