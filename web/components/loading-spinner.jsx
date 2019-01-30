import { Image, Media } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';

class LoadingSpinner extends React.Component {
	render() {
		return (
			<Media>
				<Media.Left align="middle">
					<Image src="/img/loading-spinner.gif" />
				</Media.Left>
				<Media.Body>
					<h4>Loading</h4>
					<p><em>{ this.props.message }</em></p>
				</Media.Body>
			</Media>
		);
	}
}

LoadingSpinner.propTypes = {
	message: PropTypes.string.isRequired
};

export default LoadingSpinner;
