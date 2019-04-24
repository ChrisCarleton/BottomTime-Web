import alt from '../../alt';
import FriendsActions from '../actions/friends-actions';

class FriendsStore {
	constructor() {
		this.isLoading = false;
		this.friendsList = [];
		this.myRequests = [];
		this.requestsToMe = [];
		this.showNewFriendRequestDialog = false;
		this.profileCard = '';

		this.bindListeners({
			handleFinishLoading: FriendsActions.FINISH_LOADING,
			handleSetFriendsList: FriendsActions.SET_FRIENDS_LIST,
			handleSetRequestsList: FriendsActions.SET_REQUESTS_LIST,
			handleStartLoading: FriendsActions.BEGIN_LOADING,
			handleNewFriendRequestVisiblityChanged: FriendsActions.SET_NEW_FRIEND_REQUEST_DIALOG_VISIBLE,
			handleCheckAllRequests: FriendsActions.CHECK_ALL_REQUESTS,
			handleUncheckAllRequests: FriendsActions.UNCHECK_ALL_REQUESTS,
			handleShowReasonBox: FriendsActions.SHOW_REASON_BOX,
			handleShowProfileCard: FriendsActions.SHOW_PROFILE_CARD,
			handleHideProfileCard: FriendsActions.HIDE_PROFILE_CARD
		});

		this.handleFinishLoading = this.handleFinishLoading.bind(this);
		this.handleSetFriendsList = this.handleSetFriendsList.bind(this);
		this.handleSetRequestsList = this.handleSetRequestsList.bind(this);
		this.handleStartLoading = this.handleStartLoading.bind(this);
		this.handleNewFriendRequestVisiblityChanged
			= this.handleNewFriendRequestVisiblityChanged.bind(this);
		this.handleCheckAllRequests = this.handleCheckAllRequests.bind(this);
		this.handleUncheckAllRequests = this.handleUncheckAllRequests.bind(this);
		this.handleShowReasonBox = this.handleShowReasonBox.bind(this);
		this.handleShowProfileCard = this.handleShowProfileCard.bind(this);
		this.handleHideProfileCard = this.handleHideProfileCard.bind(this);
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

	handleShowReasonBox({ index, isVisible }) {
		if (this.requestsToMe.length > index) {
			this.requestsToMe[index].reasonBoxIsVisible = isVisible;
		}
	}

	handleShowProfileCard(username) {
		this.profileCard = username;
	}

	handleHideProfileCard() {
		this.profileCard = '';
	}
}

export default alt.createStore(FriendsStore, 'FriendsStore');
