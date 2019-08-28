import { Badge, Checkbox, Glyphicon, Media } from 'react-bootstrap';
import GpsPopover from './dive-site-gps-popover';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
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

	renderDetails(diveSite) {
		const details = [];

		if (diveSite.water) {
			details.push(
				<li key="water">
					<Glyphicon title="Water" glyph="tint" />
					&nbsp;
					{
						diveSite.water === 'salt'
							? 'Salt water'
							: 'Fresh water'
					}
				</li>
			);
		}

		if (diveSite.accessibility) {
			details.push(
				<li key="accessibility">
					<Glyphicon title="Accessibility" glyph="transfer" />
					&nbsp;
					{
						diveSite.accessibility === 'shore'
							? 'Shore dive'
							: 'Boat dive'
					}
				</li>
			);
		}

		if (diveSite.entryFee || diveSite.entryFee === false) {
			details.push(
				<li key="entryFee">
					<Glyphicon title="Entry fee" glyph="piggy-bank" />
					&nbsp;
					{
						diveSite.entryFee ? 'Entry fee required' : 'Free to dive'
					}
				</li>
			);
		}

		if (diveSite.difficulty) {
			details.push(
				<li key="difficulty">
					<Glyphicon glyph="alert" />
					&nbsp;
					<span>Difficulty: <em>{ diveSite.difficulty.toFixed(1) }</em> / 5.0</span>
				</li>
			);
		}

		if (details.length === 0) {
			return <dd><em>None</em></dd>;
		}

		return (
			<dd>
				<ul className="list-inline">
					{ details }
				</ul>
			</dd>
		);
	}

	renderTags(diveSite) {
		if (diveSite.tags && diveSite.tags.length) {
			return (
				<dd>
					{
						diveSite.tags.map((tag, index) => (
							<span key={ index } style={ { paddingLeft: '2px', paddingRight: '2px' } }>
								<Badge>{ tag }</Badge>
							</span>
						))
					}
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
						{ this.renderDetails(diveSite) }

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
