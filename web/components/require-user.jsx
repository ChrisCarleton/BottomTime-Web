import CurrentUserStore from '../users/stores/current-user-store';
import React from 'react';
import { Redirect } from 'react-router-dom';

class RequireUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = CurrentUserStore.getState();
		this.handleStoreChanged = this.handleStoreChanged.bind(this);
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

	render() {
		if (!this.state.currentUser || this.state.currentUser.isAnonymous) {
			return <Redirect to="/login" />
		}

		return null;
	}
}

export default RequireUser;
