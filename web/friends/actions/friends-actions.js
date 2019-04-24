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

	checkAllRequests() {
		return true;
	}

	uncheckAllRequests() {
		return true;
	}
}

export default alt.createActions(FriendsActions);
