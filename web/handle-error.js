import CurrentUserActions from './users/actions/current-user-actions';
import ErrorActions from './actions/error-actions';

export default function (err) {
	if (err.response) {
		if (err.response.status === 401
			&& (
				!err.response.body
				|| !err.response.body.errorId
			)
		) {
			// Auth token is expired or invalid. Remove it and send the user to the login page.
			return CurrentUserActions.logout();
		}
	}

	return ErrorActions.showError(err);
}
