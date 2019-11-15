import alt from '../../alt';

class LogEntryActions {
	searchLogs() {
		return true;
	}

	searchLogsCompleted(results) {
		return results;
	}

	searchLogsFailed() {
		return true;
	}

	accessDenied() {
		return true;
	}

	changeSortOrder(sortBy, sortOrder) {
		return { sortBy, sortOrder };
	}

	toggleCheckedEntry(index) {
		return index;
	}

	selectAllEntries() {
		return true;
	}

	selectNoEntries() {
		return true;
	}
}

export default alt.createActions(LogEntryActions);
