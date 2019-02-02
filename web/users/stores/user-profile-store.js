import alt from '../../alt';
import UserProfileActions from '../actions/user-profile-actions';

class UserProfileStore {
	constructor() {
		this.currentProfile = {};
		this.isLoading = false;
		this.isForbidden = false;

		this.bindListeners({
			onGetProfile: UserProfileActions.GET_PROFILE,
			onProfileRetrieved: UserProfileActions.PROFILE_RETRIEVED,
			onProfileSaved: UserProfileActions.PROFILE_SAVED,
			onAccessDenied: UserProfileActions.ACCESS_DENIED
		});

		this.onGetProfile = this.onGetProfile.bind(this);
		this.onProfileRetrieved = this.onProfileRetrieved.bind(this);
		this.onProfileSaved = this.onProfileSaved.bind(this);
		this.onAccessDenied = this.onAccessDenied.bind(this);
	}

	onGetProfile() {
		this.currentProfile = {};
		this.isLoading = true;
		this.isForbidden = false;
	}

	onProfileRetrieved(profile) {
		this.currentProfile = profile;
		this.isLoading = false;
		this.isForbidden = false;
	}

	onProfileSaved(profile) {
		Object.assign(this.currentProfile, profile);
	}

	onAccessDenied() {
		this.isForbidden = true;
		this.isLoading = false;
		this.currentProfile = {};
	}
}

export default alt.createStore(UserProfileStore, 'UserProfileStore');
