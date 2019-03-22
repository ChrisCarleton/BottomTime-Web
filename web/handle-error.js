import CurrentUserActions from './users/actions/current-user-actions';
import CurrentUserStore from './users/stores/current-user-store';
import ErrorActions from './actions/error-actions';

export default function (err, history) {
	if (err.response) {
		if (err.response.status === 401) {
			// Auth token is expired or invalid. Remove it and send the user to the login page.
			CurrentUserActions.logout();
			history.push('/login');
			return ErrorActions.showError('Your session has expired', 'Please log in again.');
		}

		if (err.response.status === 403) {
			// Not authorized to view the current resource.
			const { isAnonymous } = CurrentUserStore.getState().currentUser;
			history.push(isAnonymous ? '/login' : '/forbidden');
		}

		if (err.response.status === 404) {
			history.push('/notFound');
		}
	}

	return ErrorActions.showError(err);
}
