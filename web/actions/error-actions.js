import alt from '../alt';

class ErrorActions {
	showSuccess(message) {
		setTimeout(this.clearError, 10000);
		return message;
	}

	showError(error) {
		setTimeout(this.clearError, 10000);

		console.log(JSON.stringify(error));
		if (error.response && error.response.body) {
			if (error.response.body.message) {
				return {
					message: error.response.body.message,
					details: error.response.body.details
				}
			}
		}

		return {
			message: 'An unexpected error occured',
			details: 'Something went wrong and the specified action could not be completed.'
		};
	}

	clearError() {
		return true;
	}
}

export default alt.createActions(ErrorActions);
