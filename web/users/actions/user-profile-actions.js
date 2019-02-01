import agent from '../../agent';
import alt from '../../alt';
import ErrorActions from '../../actions/error-actions';
import handleError from '../../handle-error';

class UserProfileActions {
	getProfile(username) {
		return async dispatch => {
			dispatch();
			try {
				const result = await agent.get(`/api/users/${ username }/profile`);
				return this.profileRetrieved(result.body);
			} catch (err) {
				if (err.response && err.response.status === 403) {
					return this.accessDenied();
				}
				return handleError(err);
			}
		};
	}

	profileRetrieved(profile) {
		return profile;
	}

	saveProfile(username, profile) {
		return async dispatch => {
			dispatch();
			try {
				await agent.patch(`/api/users/${ username }/profile`).send(profile);
				ErrorActions.showSuccess('Profile info saved');
				this.profileSaved(profile);
			} catch (err) {
				handleError(err);
			}
		};
	}

	profileSaved(profile) {
		return profile;
	}

	accessDenied() {
		return true;
	}
}

export default alt.createActions(UserProfileActions);
