import { Media } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';

class RatingsList extends React.Component {
	render() {
		return (
			<Media.List>
				{ this.props.ratings }
			</Media.List>
		);
	}
}

RatingsList.propTypes = {
	ratings: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default RatingsList;
