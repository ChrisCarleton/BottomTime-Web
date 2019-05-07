import alt from '../../alt';
import LogEntryActions from '../actions/log-entry-actions';

class LogEntryStore {
	constructor() {
		this.isSearching = false;
		this.listEntries = [];
		this.sortBy = 'entryTime';
		this.sortOrder = 'desc';

		this.bindListeners({
			handleStartSearch: LogEntryActions.SEARCH_LOGS,
			handleSearchFailed: LogEntryActions.SEARCH_LOGS_FAILED,
			handleSearchCompleted: LogEntryActions.SEARCH_LOGS_COMPLETED,
			handleChangeSortOrder: LogEntryActions.CHANGE_SORT_ORDER,
			handleToggleEntryChecked: LogEntryActions.TOGGLE_CHECKED_ENTRY,
			handleSelectAll: LogEntryActions.SELECT_ALL_ENTRIES,
			handleSelectNone: LogEntryActions.SELECT_NO_ENTRIES
		});
	}

	handleStartSearch() {
		this.listEntries = [];
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

	handleToggleEntryChecked(index) {
		if (this.listEntries[index]) {
			this.listEntries[index].checked = !this.listEntries[index].checked;
		}
	}

	handleSelectAll() {
		for (let i = 0; i < this.listEntries.length; i++) {
			this.listEntries[i].checked = true;
		}
	}

	handleSelectNone() {
		for (let i = 0; i < this.listEntries.length; i++) {
			this.listEntries[i].checked = false;
		}
	}
}

export default alt.createStore(LogEntryStore, 'LogEntryStore');
