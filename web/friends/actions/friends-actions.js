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
}

export default alt.createActions(FriendsActions);
