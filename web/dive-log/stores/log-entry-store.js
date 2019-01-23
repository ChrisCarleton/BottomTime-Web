import alt from '../../alt';
import logEntryActions from '../actions/log-entry-actions';

class LogEntryStore {
	constructor() {
		this.isSearching = false;
		this.listEntries = [];
		this.currentEntry = {};
		this.sortBy = 'entryTime';
		this.sortOrder = 'desc';

		this.bindListeners({
			handleStartSearch: logEntryActions.SEARCH_LOGS,
			handleSearchFailed: logEntryActions.SEARCH_LOGS_FAILED,
			handleUpdateEntry: logEntryActions.UPDATE_CURRENT_ENTRY,
			handleSearchCompleted: logEntryActions.SEARCH_LOGS_COMPLETED,
			handleChangeSortOrder: logEntryActions.CHANGE_SORT_ORDER
		});
	}

	handleStartSearch() {
		this.isSearching = true;
	}

	handleSearchCompleted(results) {
		this.listEntries = results;
		this.isSearching = false;
	}

	handleSearchFailed() {
		this.isSearching = false;
	}

	handleChangeSortOrder(sortParams) {
		this.sortBy = sortParams.sortBy;
		this.sortOrder = sortParams.sortOrder;
	}

	handleUpdateEntry(newEntry) {
		this.currentEntry = newEntry;
	}
}

export default alt.createStore(LogEntryStore, 'LogEntryStore');
