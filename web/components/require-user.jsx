import { Alert, Glyphicon } from 'react-bootstrap';
import connecToStores from 'alt-utils/lib/connectToStores';
import CurrentUserStore from '../users/stores/current-user-store';
import LoginForm from '../users/components/login-form';
import PropTypes from 'prop-types';
import React from 'react';

class RequireUser extends React.Component {
	static getStores() {
		return [ CurrentUserStore ];
	}

	static getPropsFromStores() {
		return CurrentUserStore.getState();
	}

	render() {
		const {
			children,
			currentUser,
			customFunction
		} = this.props;

		if ((customFunction && customFunction()) || currentUser.isAnonymous) {
			return (
				<div>
					<Alert bsStyle="warning">
						<Glyphicon glyph="exclamation-sign" />
						&nbsp;
						<strong>Login is required to proceed</strong>
					</Alert>
					<LoginForm />
				</div>
			);
		}

		return <div>{ children }</div>;
	}
}

RequireUser.propTypes = {
	children: PropTypes.node.isRequired,
	currentUser: PropTypes.object.isRequired,
	customFunction: PropTypes.func
};

export default connecToStores(RequireUser);
