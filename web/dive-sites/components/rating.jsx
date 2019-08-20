import { Media } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import StarRating from '../../components/star-rating';

class DiveSiteRating extends React.Component {
	render() {
		const { rating } = this.props;
		return (
			<Media.ListItem>
				<Media.Left>
					<StarRating
						controlId={ `rating_${ rating.ratingId }` }
						name="rating"
						value={ rating.rating }
						readOnly
					/>
				</Media.Left>
				<Media.Body>
					<Media.Heading>{ rating.owner }</Media.Heading>
					<p>{ rating.comments }</p>
				</Media.Body>
			</Media.ListItem>
		);
	}
}

DiveSiteRating.propTypes = {
	rating: PropTypes.object.isRequired
};

export default DiveSiteRating;
