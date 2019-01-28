import connectToStores from 'alt-utils/lib/connectToStores';
import ErrorActions from '../actions/error-actions';
import ErrorStore from '../stores/error-store';
import PropTypes from 'prop-types';
import React from 'react';

import { Glyphicon } from 'react-bootstrap';

class ErrorBar extends React.Component {
	static getStores() {
		return [ ErrorStore ];
	}

	static getPropsFromStores() {
		return ErrorStore.getState();
	}

	handleCloseButtonClicked() {
		ErrorActions.clearError();
	}

	render() {
		if (this.props.display === 'none') {
			return null;
		}

		const className = this.props.display === 'success'
			? 'global-error-success'
			: 'global-error-error';

		return (
			<div>
				<div id="global-error-bar" className={ className }>
					<div className="container">
						<div id="global-error-message">
							<h4 id="global-error-header">
								{ this.props.message }&nbsp;
								<small>{ this.props.details }</small>
							</h4>
						</div>
						<div id="global-error-close">
							<a id="global-error-close-button" onClick={ this.handleCloseButtonClicked }>
								<Glyphicon glyph="remove" />
							</a>
						</div>
					</div>
				</div>
				<div id="global-error-shim" />
			</div>
		);
	}
}

ErrorBar.propTypes = {
	details: PropTypes.string,
	display: PropTypes.string.isRequired,
	message: PropTypes.string
};

export default connectToStores(ErrorBar);
