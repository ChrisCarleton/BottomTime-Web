import { Button } from 'react-bootstrap';
import errorHandler from './error-handler';
import LoadingSpinner from './loading-spinner';
import PropTypes from 'prop-types';
import React from 'react';

class LoadMore extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false
		};

		this.handleLoadMore = this.handleLoadMore.bind(this);
	}

	handleLoadMore() {
		this.setState({ isLoading: true });
		this.props.load(err => {
			this.setState({ isLoading: false });

			this.props.handleError(err);
		});
	}

	render() {
		if (this.state.isLoading) {
			return <LoadingSpinner />;
		}

		return (
			<Button
				bsStyle="link"
				onClick={ this.handleLoadMore }
			>
				Load more...
			</Button>
		);
	}
}

LoadMore.propTypes = {
	handleError: PropTypes.func.isRequired,
	load: PropTypes.func.isRequired
};

export default errorHandler(LoadMore);
