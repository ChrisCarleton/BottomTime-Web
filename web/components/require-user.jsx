import connecToStores from 'alt-utils/lib/connectToStores';
import CurrentUserStore from '../users/stores/current-user-store';
import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';

class RequireUser extends React.Component {
	static getStores() {
		return [ CurrentUserStore ];
	}

	static getPropsFromStores() {
		return CurrentUserStore.getState();
	}

	render() {
		if (this.props.currentUser.isAnonymous) {
			return <Redirect to="/login" />;
		}

		return null;
	}
}

RequireUser.propTypes = {
	currentUser: PropTypes.object.isRequired
};

export default connecToStores(RequireUser);
