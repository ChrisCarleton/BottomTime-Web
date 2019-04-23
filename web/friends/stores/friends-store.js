import alt from '../../alt';
import FriendsActions from '../actions/friends-actions';

class FriendsStore {
	constructor() {
		this.isLoading = false;
		this.friendsList = [];
		this.myRequests = [];
		this.requestsToMe = [];
		this.showNewFriendRequestDialog = false;

		this.bindListeners({
			handleFinishLoading: FriendsActions.FINISH_LOADING,
			handleSetFriendsList: FriendsActions.SET_FRIENDS_LIST,
			handleSetRequestsList: FriendsActions.SET_REQUESTS_LIST,
			handleStartLoading: FriendsActions.BEGIN_LOADING,
			handleNewFriendRequestVisiblityChanged: FriendsActions.SET_NEW_FRIEND_REQUEST_DIALOG_VISIBLE
		});

		this.handleFinishLoading = this.handleFinishLoading.bind(this);
		this.handleSetFriendsList = this.handleSetFriendsList.bind(this);
		this.handleSetRequestsList = this.handleSetRequestsList.bind(this);
		this.handleStartLoading = this.handleStartLoading.bind(this);
		this.handleNewFriendRequestVisiblityChanged
			= this.handleNewFriendRequestVisiblityChanged.bind(this);
	}

	handleFinishLoading() {
		this.isLoading = false;
	}

	handleSetFriendsList(friends) {
		this.friendsList = friends;
	}

	handleSetRequestsList(requests) {
		this.requestsToMe = requests;
	}

	handleStartLoading() {
		this.isLoading = true;
	}

	handleNewFriendRequestVisiblityChanged(isVisible) {
		this.showNewFriendRequestDialog = isVisible;
	}
}

export default alt.createStore(FriendsStore, 'FriendsStore');
