import alt from '../../alt';
import logEntryActions from '../actions/log-entry-actions';

class LogEntryStore {
	constructor() {
		this.isSearching = false;
		this.listEntries = [];
		this.currentEntry = {};

		this.bindListeners({
			handleStartSearch: logEntryActions.SEARCH_LOGS,
			handleSearchFailed: logEntryActions.SEARCH_LOGS_FAILED,
			handleUpdateEntry: logEntryActions.UPDATE_CURRENT_ENTRY
		});

		this.handleUpdateEntry = this.handleUpdateEntry.bind(this);
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

	handleUpdateEntry(newEntry) {
		this.currentEntry = newEntry;
	}
}

export default alt.createStore(LogEntryStore, 'LogEntryStore');
