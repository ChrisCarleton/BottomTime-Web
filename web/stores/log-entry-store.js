import alt from '../alt';
import logEntryActions from '../actions/log-entry-actions';

class LogEntryStore {
	constructor() {
		this.currentEntry = {};

		this.bindListeners({
			handleUpdateEntry: logEntryActions.UPDATE_CURRENT_ENTRY
		});

		this.handleUpdateEntry = this.handleUpdateEntry.bind(this);
	}

	handleUpdateEntry(newEntry) {
		this.currentEntry = newEntry;
	}
}

export default alt.createStore(LogEntryStore, 'LogEntryStore');
