import agent from '../../agent';
import alt from '../../alt';
import handleError from '../../handle-error';

class UserProfileActions {
	getProfile(username) {
		return async dispatch => {
			dispatch();
			try {
				const result = await agent.get(`/api/users/${ username }/profile`);
				this.profileRetrieved(result.body);
			} catch (err) {
				handleError(err);
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
				this.profileSaved(profile);
			} catch (err) {
				handleError(err);
			}
		};
	}

	profileSaved(profile) {
		return profile;
	}
}

export default alt.createActions(UserProfileActions);
