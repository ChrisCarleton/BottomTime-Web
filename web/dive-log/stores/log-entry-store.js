import alt from '../../alt';
import LogEntryActions from '../actions/log-entry-actions';

class LogEntryStore {
	constructor() {
		this.isForbidden = false;
		this.isSearching = false;
		this.listEntries = [];
		this.sortBy = 'entryTime';
		this.sortOrder = 'desc';

		this.bindListeners({
			handleStartSearch: LogEntryActions.SEARCH_LOGS,
			handleSearchFailed: LogEntryActions.SEARCH_LOGS_FAILED,
			handleSearchCompleted: LogEntryActions.SEARCH_LOGS_COMPLETED,
			handleChangeSortOrder: LogEntryActions.CHANGE_SORT_ORDER,
			handleAccessDenied: LogEntryActions.ACCESS_DENIED
		});
	}

	handleStartSearch() {
		this.listEntries = [];
		this.isSearching = true;
		this.isForbidden = false;
	}

	handleSearchCompleted(results) {
		this.listEntries = results;
		this.isSearching = false;
	}

	handleSearchFailed() {
		this.isSearching = false;
	}

	handleAccessDenied() {
		this.isForbidden = true;
		this.isSearching = false;
		this.listEntries = [];
		this.currentEntry = {};
	}

	handleChangeSortOrder(sortParams) {
		this.sortBy = sortParams.sortBy;
		this.sortOrder = sortParams.sortOrder;
	}
}

export default alt.createStore(LogEntryStore, 'LogEntryStore');
