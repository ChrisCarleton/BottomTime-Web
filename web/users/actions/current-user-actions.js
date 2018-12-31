import alt from '../../alt';

class CurrentUserActions {
	loginSucceeded(result) {
		return result.body;
	}

	fetchCurrentUser() {
		return true;
	}
}

export default alt.createActions(CurrentUserActions);
