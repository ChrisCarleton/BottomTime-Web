import { Alert, Badge, Glyphicon, Media } from 'react-bootstrap';
import connectToStores from 'alt-utils/lib/connectToStores';
import DiveSitesListItem from './dive-sites-list-item';
import DiveSitesStore from '../stores/dive-sites-store';
import LoadingSpinner from '../../components/loading-spinner';
import PropTypes from 'prop-types';
import React from 'react';

require('../../img/dive-site-flag.png');

class DiveSitesList extends React.Component {
	static getStores() {
		return [ DiveSitesStore ];
	}

	static getPropsFromStores() {
		return DiveSitesStore.getState();
	}

	render() {
		const {
			isLoadingSites,
			isPristine,
			diveSites
		} = this.props;

		if (isLoadingSites) {
			return <LoadingSpinner message="Loading dive sites..." />;
		}

		if (isPristine) {
			return (
				<Alert bsStyle="info">
					<p>
						<Glyphicon glyph="info-sign" />
						&nbsp;
						Perform a search above to list dive sites.
					</p>
				</Alert>
			);
		}

		if (diveSites.length === 0) {
			return (
				<Alert bsStyle="info">
					<p>
						<Glyphicon glyph="info-sign" />
						&nbsp;
						No dive sites match your search criteria.
						Click <strong>Create New Dive Site</strong> above to add dive sites or modify your
						search criteria.
					</p>
				</Alert>
			);
		}

		return (
			<div>
				<p>Showing <Badge>{ this.props.diveSites.length }</Badge> dive sites.</p>
				<Media.List>
					{
						diveSites.map(
							site => <DiveSitesListItem key={ site.siteId } diveSite={ site } />
						)
					}
				</Media.List>
			</div>
		);
	}
}

DiveSitesList.propTypes = {
	diveSites: PropTypes.arrayOf(PropTypes.object).isRequired,
	isLoadingSites: PropTypes.bool.isRequired,
	isPristine: PropTypes.bool.isRequired
};

export default connectToStores(DiveSitesList);
