import handleError from '../handle-error';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';

export default function (page) {
	class ErrorHandler extends React.Component {
		constructor(props) {
			super(props);
			this.PageComponent = page;
			this.onErrorResponse = this.onErrorResponse.bind(this);
		}

		onErrorResponse(err) {
			handleError(err, this.props.history);
		}

		render() {
			return <this.PageComponent handleError={ this.onErrorResponse } { ...this.props } />;
		}
	}

	ErrorHandler.propTypes = {
		history: PropTypes.object.isRequired
	};

	return withRouter(ErrorHandler);
}
