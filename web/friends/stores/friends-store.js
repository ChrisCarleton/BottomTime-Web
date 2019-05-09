import alt from '../../alt';
import FriendsActions from '../actions/friends-actions';

class FriendsStore {
	constructor() {
		this.isLoadingFriends = false;
		this.isLoadingRequests = false;
		this.friendsList = [];
		this.myRequests = [];
		this.requestsToMe = [];
		this.showNewFriendRequestDialog = false;
		this.profileCard = '';

		this.bindListeners({
			handleFinishLoadingFriends: FriendsActions.FINISH_LOADING_FRIENDS,
			handleFinishLoadingRequests: FriendsActions.FINISH_LOADING_REQUESTS,
			handleSetFriendsList: FriendsActions.SET_FRIENDS_LIST,
			handleSetRequestsList: FriendsActions.SET_REQUESTS_LIST,
			handleStartLoadingFriends: FriendsActions.BEGIN_LOADING_FRIENDS,
			handleStartLoadingRequests: FriendsActions.BEGIN_LOADING_REQUESTS,
			handleNewFriendRequestVisiblityChanged: FriendsActions.SET_NEW_FRIEND_REQUEST_DIALOG_VISIBLE,
			handleCheckAllRequests: FriendsActions.CHECK_ALL_REQUESTS,
			handleUncheckAllRequests: FriendsActions.UNCHECK_ALL_REQUESTS,
			handleShowReasonBox: FriendsActions.SHOW_REASON_BOX,
			handleShowProfileCard: FriendsActions.SHOW_PROFILE_CARD,
			handleHideProfileCard: FriendsActions.HIDE_PROFILE_CARD
		});

		this.handleFinishLoadingFriends = this.handleFinishLoadingFriends.bind(this);
		this.handleFinishLoadingRequests = this.handleFinishLoadingRequests.bind(this);
		this.handleSetFriendsList = this.handleSetFriendsList.bind(this);
		this.handleSetRequestsList = this.handleSetRequestsList.bind(this);
		this.handleStartLoadingFriends = this.handleStartLoadingFriends.bind(this);
		this.handleStartLoadingRequests = this.handleStartLoadingRequests.bind(this);
		this.handleNewFriendRequestVisiblityChanged
			= this.handleNewFriendRequestVisiblityChanged.bind(this);
		this.handleCheckAllRequests = this.handleCheckAllRequests.bind(this);
		this.handleUncheckAllRequests = this.handleUncheckAllRequests.bind(this);
		this.handleShowReasonBox = this.handleShowReasonBox.bind(this);
		this.handleShowProfileCard = this.handleShowProfileCard.bind(this);
		this.handleHideProfileCard = this.handleHideProfileCard.bind(this);
	}

	handleFinishLoadingFriends() {
		this.isLoadingFriends = false;
	}

	handleFinishLoadingRequests() {
		this.isLoadingRequests = false;
	}

	handleSetFriendsList(friends) {
		this.friendsList = friends;
	}

	handleSetRequestsList(requests) {
		this.requestsToMe = requests;
	}

	handleStartLoadingFriends() {
		this.isLoadingFriends = true;
	}

	handleStartLoadingRequests() {
		this.isLoadingRequests = true;
	}

	handleNewFriendRequestVisiblityChanged(isVisible) {
		this.showNewFriendRequestDialog = isVisible;
	}

	handleCheckAllRequests() {
		for (let i = 0; i < this.requestsToMe.length; i++) {
			this.requestsToMe[i].checked = true;
		}
	}

	handleUncheckAllRequests() {
		for (let i = 0; i < this.requestsToMe.length; i++) {
			this.requestsToMe[i].checked = false;
		}
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
