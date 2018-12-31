import ErrorStore from '../stores/error-store';
import React from 'react';

import {
	Alert
} from 'react-bootstrap';

class ErrorBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = ErrorStore.getState();
		this.handleStoreChanged = this.handleStoreChanged.bind(this);
	}

	componentDidMount() {
		ErrorStore.listen(this.handleStoreChanged);
	}

	componentWillUnmount() {
		ErrorStore.unlisten(this.handleStoreChanged);
	}

	handleStoreChanged() {
		this.setState(ErrorStore.getState());
	}

	render() {
		if (this.state.display === 'none') {
			return null;
		}

		const bsStyle = (this.state.display === 'error') ? 'danger' : 'success';

		return (
			<Alert bsStyle={ bsStyle }>
				<h4>{ this.state.message }</h4>
				<p>{ this.state.details }</p>
			</Alert>
		);
	}
}

export default ErrorBox;
