import agent from '../../agent';
import CurrentUserActions from '../actions/current-user-actions';
import ErrorActions from '../../actions/error-actions';

const CurrentUserSource = {
	getCurrentUser: {
		remote() {
			return agent.get('/api/auth/me');
		},

		local(state) {
			return state.currentUser;
		},

		success: CurrentUserActions.loginSucceeded,
		error: ErrorActions.showError
	}
};

export default CurrentUserSource;
