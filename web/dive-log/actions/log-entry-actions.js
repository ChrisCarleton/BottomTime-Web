import agent from '../../agent';
import alt from '../../alt';
import handleError from '../../handle-error';

class LogEntryActions {
	searchLogs(username, params, history) {
		params = params || {};

		return async dispatch => {
			try {
				dispatch();
				const results = await agent
					.get(`/api/users/${ username }/logs`)
					.query(params);
				this.searchLogsCompleted(results.body);
			} catch (err) {
				if (err.response && err.response.status === 403) {
					this.accessDenied();
				} else {
					this.searchLogsFailed(err, history);
				}
			}
		};
	}

	searchLogsCompleted(results) {
		return results;
	}

	searchLogsFailed(err, history) {
		handleError(err, history);
		return true;
	}

	accessDenied() {
		return true;
	}

	changeSortOrder(sortBy, sortOrder) {
		return { sortBy, sortOrder };
	}
}

export default alt.createActions(LogEntryActions);
