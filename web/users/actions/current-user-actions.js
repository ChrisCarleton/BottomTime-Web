import agent from '../../agent';
import alt from '../../alt';
import ErrorActions from '../../actions/error-actions';

class CurrentUserActions {
	login(model) {
		return async dispatch => {
			dispatch();
			try {
				await agent.post('/api/auth/login').send(model);

				const result = await agent.get('/api/auth/me');
				this.loginSucceeded(result);
			} catch (err) {
				ErrorActions.showError(err);
			}
		};
	}

	logout() {
		return async dispatch => {
			dispatch();
			try {
				await agent.post('/api/auth/logout');
				this.fetchCurrentUser();
			} catch (err) {
				ErrorActions.showError(err);
			}
		};
	}

	loginSucceeded(result) {
		return result.body;
	}

	fetchCurrentUser() {
		return true;
	}
}

export default alt.createActions(CurrentUserActions);
