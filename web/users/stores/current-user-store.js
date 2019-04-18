import alt from '../../alt';
import CurrentUserActions from '../actions/current-user-actions';
import initialState from '../../initial-state';

class CurrentUserStore {
	constructor() {
		this.currentUser = null;

		this.bindListeners({
			onLoginSucceeded: CurrentUserActions.LOGIN_SUCCEEDED,
			onLogout: CurrentUserActions.LOGOUT,
			onUpdateUser: CurrentUserActions.UPDATE_USER
		});

		this.onLoginSucceeded = this.onLoginSucceeded.bind(this);
		this.onLogout = this.onLogout.bind(this);
		this.onUpdateUser = this.onUpdateUser.bind(this);
	}

	onLoginSucceeded(user) {
		this.currentUser = user;
	}

	onUpdateUser(update) {
		this.currentUser = {
			...this.currentUser,
			...update
		};
	}

	onLogout() {
		this.currentUser = { ...initialState.CurrentUserStore.currentUser };
	}

}

export default alt.createStore(CurrentUserStore, 'CurrentUserStore');
