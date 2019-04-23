import alt from '../../alt';

class FriendsActions {
	beginLoading() {
		return true;
	}

	finishLoading() {
		return true;
	}

	setFriendsList(friends) {
		return friends;
	}

	setRequestsList(requests) {
		return requests;
	}

	setNewFriendRequestDialogVisible(isVisible) {
		return isVisible;
	}
}

export default alt.createActions(FriendsActions);
