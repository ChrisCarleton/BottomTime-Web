import alt from '../alt';
import ErrorActions from '../actions/error-actions';

class ErrorStore {
	constructor() {
		this.message = '';
		this.details = '';
		this.display = 'none';

		this.bindListeners({
			handleShowError: ErrorActions.SHOW_ERROR,
			handleShowSuccess: ErrorActions.SHOW_SUCCESS,
			handleClearError: ErrorActions.CLEAR_ERROR
		});

		this.handleClearError = this.handleClearError.bind(this);
		this.handleShowError = this.handleShowError.bind(this);
		this.handleShowSuccess = this.handleShowSuccess.bind(this);
	}

	handleShowError(error) {
		this.message = error.message;
		this.details = error.details;
		this.display = 'error';
	}

	handleShowSuccess(success) {
		this.message = success.message;
		this.details = success.details;
		this.display = 'success';
	}

	handleClearError() {
		this.message = '';
		this.details = '';
		this.display = 'none';
	}
}

export default alt.createStore(ErrorStore, 'ErrorStore');
