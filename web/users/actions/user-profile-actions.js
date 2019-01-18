import agent from '../../agent';
import alt from '../../alt';
import ErrorActions from '../../actions/error-actions';

class UserProfileActions {
	getProfile(username) {
		return async dispatch => {
			dispatch();
			try {
				const result = await agent.get(`/api/users/${ username }/profile`);
				this.profileRetrieved(result.body);
			} catch (err) {
				ErrorActions.showError(err);
			}
		};
	}

	profileRetrieved(profile) {
		return profile;
	}
}

export default alt.createActions(UserProfileActions);
