import alt from '../alt';

class CurrentUserActions {
	signUpUserSucceeded(result) {
		console.log(result);
	}

	signUpUserFailed(err) {
		console.error(err);
	}
}

export default alt.createActions(CurrentUserActions);
