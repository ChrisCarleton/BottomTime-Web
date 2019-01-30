import alt from '../../alt';
import UserProfileActions from '../actions/user-profile-actions';

class UserProfileStore {
	constructor() {
		this.currentProfile = {};
		this.isLoading = false;

		this.bindListeners({
			onGetProfile: UserProfileActions.GET_PROFILE,
			onProfileRetrieved: UserProfileActions.PROFILE_RETRIEVED,
			onProfileSaved: UserProfileActions.PROFILE_SAVED
		});

		this.onGetProfile = this.onGetProfile.bind(this);
		this.onProfileRetrieved = this.onProfileRetrieved.bind(this);
		this.onProfileSaved = this.onProfileSaved.bind(this);
	}

	onGetProfile() {
		this.currentProfile = {};
		this.isLoading = true;
	}

	onProfileRetrieved(profile) {
		this.currentProfile = profile;
		this.isLoading = false;
	}

	onProfileSaved(profile) {
		Object.assign(this.currentProfile, profile);
	}
}

export default alt.createStore(UserProfileStore, 'UserProfileStore');
