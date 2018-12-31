import agent from '../../agent';
import alt from '../../alt';
import ErrorActions from '../../actions/error-actions';

class CurrentUserActions {
	login(model) {
		return dispatch => {
			dispatch();
			agent
				.post('/api/auth/login')
				.send(model)
				.then(() => agent.get('/api/auth/me'))
				.then(result => {
					this.loginSucceeded(result);
				})
				.catch(ErrorActions.showError);
		};
	}

	logout() {
		return dispatch => {
			dispatch();
			agent
				.post('/api/auth/logout')
				.then(() => {
					this.fetchCurrentUser();
				})
				.catch(ErrorActions.showError);
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
