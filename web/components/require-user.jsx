import connecToStores from 'alt-utils/lib/connectToStores';
import CurrentUserStore from '../users/stores/current-user-store';
import Login from '../users/components/login';
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
		if (this.props.currentUser.isAnonymous) {
			return <Login />;
		}

		return <div>{ this.props.children }</div>;
	}
}

RequireUser.propTypes = {
	children: PropTypes.node.isRequired,
	currentUser: PropTypes.object.isRequired
};

export default connecToStores(RequireUser);
