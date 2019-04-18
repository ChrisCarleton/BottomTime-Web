import alt from '../../alt';

class UserProfileActions {
	beginLoading() {
		return true;
	}

	setProfile(profile) {
		return profile;
	}

	finishLoading() {
		return true;
	}
}

export default alt.createActions(UserProfileActions);
