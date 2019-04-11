import alt from '../../alt';

class CurrentLogEntryActions {
	beginLoading() {
		return true;
	}

	finishLoading() {
		return true;
	}

	setCurrentEntry(entry) {
		return entry;
	}
}

export default alt.createActions(CurrentLogEntryActions);
