import alt from '../../alt';
import CurrentLogEntryActions from '../actions/current-log-entry-actions';

class CurrentLogEntryStore {
	constructor() {
		this.currentEntry = {};
		this.isLoading = true;

		this.bindListeners({
			handleBeginLoading: CurrentLogEntryActions.BEGIN_LOADING,
			handleFinishLoading: CurrentLogEntryActions.FINISH_LOADING,
			handleSetEntry: CurrentLogEntryActions.SET_CURRENT_ENTRY
		});

		this.handleBeginLoading = this.handleBeginLoading.bind(this);
		this.handleFinishLoading = this.handleFinishLoading.bind(this);
		this.handleSetEntry = this.handleSetEntry.bind(this);
	}

	handleBeginLoading() {
		this.isLoading = true;
	}

	handleFinishLoading() {
		this.isLoading = false;
	}

	handleSetEntry(newEntry) {
		this.currentEntry = newEntry || {};
		this.isLoading = false;
	}
}

export default alt.createStore(CurrentLogEntryStore, 'CurrentLogEntryStore');
