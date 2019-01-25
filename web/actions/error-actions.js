import alt from '../alt';

class ErrorActions {
	constructor() {
		this.timeout = null;
	}

	showSuccess(message, details) {
		if (this.timeout) {
			clearTimeout(this.timeout);
		}

		this.timeout = setTimeout(this.clearError, 10000);
		return { message, details };
	}

	showError(error, details) {
		if (this.timeout) {
			clearTimeout(this.timeout);
		}

		this.timeout = setTimeout(this.clearError, 10000);

		if (error.response && error.response.body) {
			if (error.response.body.message) {
				return {
					message: error.response.body.message,
					details: error.response.body.details
				};
			}
		}

		if (typeof (error) === 'string') {
			return {
				message: error,
				details
			};
		}

		return {
			message: 'An unexpected error occured',
			details: 'Something went wrong and the specified action could not be completed.'
		};
	}

	clearError() {
		if (this.timeout) {
			clearTimeout(this.timeout);
			this.timeout = null;
		}

		return true;
	}
}

export default alt.createActions(ErrorActions);
