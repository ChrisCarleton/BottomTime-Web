import alt from '../../alt';
import UserProfileActions from '../actions/user-profile-actions';

class UserProfileStore {
	constructor() {
		this.currentProfile = {};

		this.bindListeners({
			onProfileRetrieved: UserProfileActions.PROFILE_RETRIEVED
		});

		this.onProfileRetrieved = this.onProfileRetrieved.bind(this);
	}

	onProfileRetrieved(profile) {
		this.currentProfile = profile;
	}
}

export default alt.createStore(UserProfileStore, 'UserProfileStore');
