import agent from '../../agent';
import ErrorActions from '../../actions/error-actions';
import FriendsActions from '../actions/friends-actions';
import handleError from '../../handle-error';

export default {
	async refreshFriends(history, username) {
		try {
			FriendsActions.beginLoadingFriends();
			const response = await agent
				.get(`/api/users/${ username }/friends`)
				.query({ type: 'friends' });

			FriendsActions.setFriendsList(response.body);
		} catch (err) {
			handleError(err, history);
		} finally {
			FriendsActions.finishLoadingFriends();
		}
	},

	async refreshFriendRequests(history, username) {
		try {
			FriendsActions.beginLoadingRequests();
			const response = await agent
				.get(`/api/users/${ username }/friends`)
				.query({ type: 'requests-incoming' });

			FriendsActions.setRequestsList(response.body);
		} catch (err) {
			handleError(err, history);
		} finally {
			FriendsActions.finishLoadingRequests();
		}
	},

	async processFriendRequest(history, request, approveOrDisapprove, reason) {
		try {
			await agent
				.post(`/api/users/${ request.user }/friends/${ request.friend }/${ approveOrDisapprove }`)
				.send({ reason });
			ErrorActions.showSuccess(
				`Dive buddy request has been ${ approveOrDisapprove === 'approve' ? 'approved' : 'declined' }.`);
		} catch (err) {
			handleError(err, history);
		}
	}
};
