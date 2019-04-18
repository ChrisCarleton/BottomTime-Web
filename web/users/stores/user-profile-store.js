import alt from '../../alt';
import UserProfileActions from '../actions/user-profile-actions';

class UserProfileStore {
	constructor() {
		this.currentProfile = {};
		this.isLoading = true;

		this.bindListeners({
			onBeginLoading: UserProfileActions.BEGIN_LOADING,
			onSetProfile: UserProfileActions.SET_PROFILE,
			onFinishLoading: UserProfileActions.FINISH_LOADING
		});

		this.onSetProfile = this.onSetProfile.bind(this);
		this.onBeginLoading = this.onBeginLoading.bind(this);
		this.onFinishLoading = this.onFinishLoading.bind(this);
	}

	onSetProfile(profile) {
		Object.assign(this.currentProfile, profile);
		this.isLoading = false;
	}

	onBeginLoading() {
		this.isLoading = true;
	}

	onFinishLoading() {
		this.isLoading = false;
	}
}

export default alt.createStore(UserProfileStore, 'UserProfileStore');
