import { Checkbox, Glyphicon, Media } from 'react-bootstrap';
import DiveSiteDetails from './dive-site-details';
import GpsPopover from './dive-site-gps-popover';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TagsListControl from '../../components/tags-list-control';
import Ratings from '../../components/rating-control';
import React from 'react';

class DiveSitesListItem extends React.Component {
	renderGpsPopover(id, gps) {
		if (gps && gps.lon && gps.lat) {
			return <GpsPopover controlId={ id } coordinates={ gps } />;
		}

		return null;
	}

	renderLocation(diveSite) {
		let locationString = null;

		if (diveSite.location && diveSite.country) {
			locationString = `${ diveSite.location }, ${ diveSite.country }`;
		} else if (diveSite.location) {
			locationString = diveSite.location;
		} else if (diveSite.country) {
			locationString = diveSite.country;
		}

		return (
			<dd>
				<Glyphicon title="Location" glyph="map-marker" />
				&nbsp;
				{ locationString || <em>Unspecified</em> }
				{ this.renderGpsPopover(`gps_${ diveSite.siteId }`, diveSite.gps) }
			</dd>
		);
	}

	renderTags(diveSite) {
		if (diveSite.tags && diveSite.tags.length) {
			return (
				<dd>
					<TagsListControl tags={ diveSite.tags } />
				</dd>
			);
		}

		return <dd><em>None</em></dd>;
	}

	renderRatings(diveSite) {
		if (!diveSite.avgRating) {
			return <dd><em>Not rated</em></dd>;
		}

		return (
			<dd>
				<Ratings rating={ diveSite.avgRating } readOnly />
			</dd>
		);
	}

	renderDescription(diveSite) {
		return <dd><em>{ diveSite.description || 'None' }</em></dd>;
	}

	render() {
		const { diveSite } = this.props;
		return (
			<Media.ListItem>
				<Media.Left>
					<Checkbox checked={ diveSite.checked } />
				</Media.Left>
				<Media.Body>
					<Media.Heading>
						<Link to={ `/diveSites/${ diveSite.siteId }` }>{ diveSite.name }</Link>
					</Media.Heading>
					<dl className="dl-horizontal">
						<dt>Tags:</dt>
						{ this.renderTags(diveSite) }

						<dt>Location:</dt>
						{ this.renderLocation(diveSite) }

						<dt>Site details:</dt>
						<dd><DiveSiteDetails diveSite={ diveSite } /></dd>

						<dt>Average rating:</dt>
						{ this.renderRatings(diveSite) }

						<dt>Description:</dt>
						{ this.renderDescription(diveSite) }
					</dl>
				</Media.Body>
			</Media.ListItem>
		);
	}
}

DiveSitesListItem.propTypes = {
	diveSite: PropTypes.object.isRequired
};

export default DiveSitesListItem;
