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
			handleNewFriendRequestVisiblityChanged: FriendsActions.SET_NEW_FRIEND_REQUEST_DIALOG_VISIBLE,
			handleCheckAllRequests: FriendsActions.CHECK_ALL_REQUESTS,
			handleUncheckAllRequests: FriendsActions.UNCHECK_ALL_REQUESTS
		});

		this.handleFinishLoading = this.handleFinishLoading.bind(this);
		this.handleSetFriendsList = this.handleSetFriendsList.bind(this);
		this.handleSetRequestsList = this.handleSetRequestsList.bind(this);
		this.handleStartLoading = this.handleStartLoading.bind(this);
		this.handleNewFriendRequestVisiblityChanged
			= this.handleNewFriendRequestVisiblityChanged.bind(this);
		this.handleCheckAllRequests = this.handleCheckAllRequests.bind(this);
		this.handleUncheckAllRequests = this.handleUncheckAllRequests.bind(this);
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

	handleCheckAllRequests() {
		this.requestsToMe = this.requestsToMe.map(r => ({
			...r,
			checked: true
		}));
	}

	handleUncheckAllRequests() {
		this.requestsToMe = this.requestsToMe.map(r => ({
			...r,
			checked: false
		}));
	}
}

export default alt.createStore(FriendsStore, 'FriendsStore');
