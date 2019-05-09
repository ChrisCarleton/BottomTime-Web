import alt from '../../alt';

class FriendsActions {
	beginLoadingFriends() {
		return true;
	}

	finishLoadingFriends() {
		return true;
	}

	beginLoadingRequests() {
		return true;
	}

	finishLoadingRequests() {
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
