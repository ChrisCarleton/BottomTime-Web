import PropTypes from 'prop-types';
import Ratings from 'react-ratings-declarative';
import React from 'react';

class RatingControl extends React.Component {
	render() {
		const { changeRating, large, rating, readOnly } = this.props;

		return (
			<Ratings
				rating={ rating }
				changeRating={
					/* eslint-disable no-empty-function */
					readOnly
						? () => {}
						: changeRating
					/* eslint-enable no-empty-function */
				}
				widgetDimensions={ large ? '30px' : '11px' }
				widgetRatedColors="rgb(255, 0, 0)"
			>
				<Ratings.Widget />
				<Ratings.Widget />
				<Ratings.Widget />
				<Ratings.Widget />
				<Ratings.Widget />
			</Ratings>
		);
	}
}

RatingControl.propTypes = {
	changeRating: PropTypes.func,
	large: PropTypes.bool,
	rating: PropTypes.number,
	readOnly: PropTypes.bool
};

export default RatingControl;
