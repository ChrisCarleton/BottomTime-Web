import agent from '../../agent';
import alt from '../../alt';
import ErrorActions from '../../actions/error-actions';
import TanksActions from '../../tanks/actions/tanks-actions';

class CurrentUserActions {
	logout() {
		return async dispatch => {
			dispatch();

			try {
				await agent.post('/api/auth/logout');
				TanksActions.refreshTanks();
			} catch (err) {
				// Not much to do here. As long as the auth token gets cleared, we're good.
				/* eslint-disable no-console */
				console.error(err);
				/* eslint-enable no-console */
			}
		};
	}

	loginSucceeded(user) {
		return async dispatch => {
			dispatch(user);
			TanksActions.refreshTanks();
			try {
				const { body } = await agent.get(`/api/users/${ user.username }/profile`);
				this.updateProfile(body);
			} catch (err) {
				ErrorActions.showError('An error occurred while retrieving your profile info');
			}
		};
	}

	updateUser(update) {
		return update;
	}

	updateProfile(profile) {
		return profile;
	}
}

export default alt.createActions(CurrentUserActions);
