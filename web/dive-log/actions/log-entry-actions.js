import agent from '../../agent';
import alt from '../../alt';
import ErrorActions from '../../actions/error-actions';

class LogEntryActions {
	searchLogs(username, params) {
		params = params || {};

		return async dispatch => {
			try {
				dispatch();
				const results = await agent.get(`/users/${ username }/logs`).query(params);
				this.searchLogsCompleted(results.body);
			} catch (err) {
				ErrorActions.showError(err);
			}
		};
	}

	searchLogsCompleted(results) {
		return results;
	}

	updateCurrentEntry(entry) {
		return entry;
	}
}

export default alt.createActions(LogEntryActions);
