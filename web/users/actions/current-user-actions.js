import agent from '../../agent';
import alt from '../../alt';
import ErrorActions from '../../actions/error-actions';

class CurrentUserActions {
	trySignup(model, done) {
		return async dispatch => {
			dispatch();
			try {
				const result = await agent
					.put(`/api/users/${ model.username }`)
					.send({
						email: model.email,
						password: model.password,
						role: 'user'
					});


				ErrorActions.showSuccess('Success!', 'Your new account has been created.');
				done();
				return this.loginSucceeded(result);
			} catch (err) {
				return done(err);
			}
		};
	}

	logout() {
		return async dispatch => {
			dispatch();

			try {
				await agent.post('/api/auth/logout');
			} catch (err) {
				// Not much to do here. As long as the auth token gets cleared, we're good.
			} finally {
				agent.clearAuthToken();
			}
		};
	}

	loginSucceeded(result) {
		agent.setAuthToken(result.body.token);
		return result.body.user;
	}

	updateUser(update) {
		return update;
	}
}

export default alt.createActions(CurrentUserActions);
