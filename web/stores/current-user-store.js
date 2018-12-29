import currentUserActions from '../actions/current-user-actions';
import CurrentUserSource from '../sources/current-user-source';

class CurrentUserStore {
	constructor() {
		this.currentUser = {};
		this.bindListeners({
			handleSignUpUser: currentUserActions.SIGN_UP_USER
		});
		this.registerAsync(CurrentUserSource);

		this.handleSignUpUser = this.handleSignUpUser.bind(this);
	}

	onGetCurrentUser() {
		this.getInstance().getCurrentUser();
	}

	handleSignUpUser(user) {
		this.currentUser = user;
	}
}

export default CurrentUserStore;
