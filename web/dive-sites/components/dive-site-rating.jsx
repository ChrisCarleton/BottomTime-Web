import { Media } from 'react-bootstrap';
import moment from 'moment';
import PropTypes from 'prop-types';
import Rating from '../../components/rating-control';
import React from 'react';

class DiveSiteRating extends React.Component {
	render() {
		const { rating } = this.props;

		return (
			<Media>
				<Media.Body>
					<Rating rating={ rating.rating } readOnly />
					<p style={ { paddingLeft: '12px' } }>{ rating.comments }</p>
					<p>
						<em>
							Submitted by <strong>{ rating.user }</strong>&nbsp;
							{ moment(rating.date).fromNow() }
						</em>
					</p>
				</Media.Body>
			</Media>
		);
	}
}

DiveSiteRating.propTypes = {
	rating: PropTypes.object.isRequired
};

export default DiveSiteRating;
