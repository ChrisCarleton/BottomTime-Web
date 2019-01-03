import connectToStores from 'alt-utils/lib/connectToStores';
import ErrorStore from '../stores/error-store';
import PropTypes from 'prop-types';
import React from 'react';

import {
	Alert
} from 'react-bootstrap';

class ErrorBox extends React.Component {
	static getStores() {
		return [ ErrorStore ];
	}

	static getPropsFromStores() {
		return ErrorStore.getState();
	}

	render() {
		if (this.props.display === 'none') {
			return null;
		}

		const bsStyle = (this.props.display === 'error') ? 'danger' : 'success';

		return (
			<Alert bsStyle={ bsStyle }>
				<h4>{ this.props.message }</h4>
				<p>{ this.props.details }</p>
			</Alert>
		);
	}
}

ErrorBox.propTypes = {
	details: PropTypes.string,
	display: PropTypes.string.isRequired,
	message: PropTypes.string
};

export default connectToStores(ErrorBox);
