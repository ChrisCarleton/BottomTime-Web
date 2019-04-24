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

	showReasonBox(index, isVisible) {
		return {
			index,
			isVisible
		};
	}

	showProfileCard(username) {
		return username;
	}

	hideProfileCard() {
		return true;
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
