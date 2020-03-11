import { Button } from 'react-bootstrap';
import LoadingSpinner from './loading-spinner';
import PropTypes from 'prop-types';
import React from 'react';

class LoadMore extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isEof: false,
			isLoading: false
		};

		this.handleLoadMore = this.handleLoadMore.bind(this);
	}

	handleLoadMore() {
		this.setState({ isLoading: true, isEof: false });
		this.props.load((err, eof) => {
			this.setState({ isLoading: false, isEof: false });
			if (err) {
				this.props.handleError(err);
			}
			if (eof) {
				this.setState({ isLoading: false, isEof: true });
			}
		});
	}

	render() {
		if (this.state.isLoading) {
			return <LoadingSpinner message={ this.props.loadingMessage } />;
		}

		if (this.state.isEof) {
			return null;
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
	load: PropTypes.func.isRequired,
	loadingMessage: PropTypes.string.isRequired
};

LoadMore.defaultProps = {
	loadingMessage: 'Loading more results...'
};

export default LoadMore;
