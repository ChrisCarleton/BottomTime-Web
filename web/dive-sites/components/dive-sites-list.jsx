import { Alert, Badge, Glyphicon, Media } from 'react-bootstrap';
import DiveSitesListItem from './dive-sites-list-item';
import LoadingSpinner from '../../components/loading-spinner';
import PropTypes from 'prop-types';
import React from 'react';

require('../../img/dive-site-flag.png');

class DiveSitesList extends React.Component {
	render() {
		if (this.props.isLoadingSites) {
			return <LoadingSpinner message="Loading dive sites..." />;
		}

		if (this.props.diveSites.length === 0) {
			return (
				<Alert bsStyle="info">
					<p>
						<Glyphicon glyph="info-sign" />
						&nbsp;
						You have no dive sites to show.
						Click <strong>Create New Dive Site</strong> above to add dive sites or search for
						existing sites.
					</p>
				</Alert>
			);
		}

		return (
			<div>
				<p>Showing <Badge>{ this.props.diveSites.length }</Badge> dive sites.</p>
				<Media.List>
					{
						this.props.diveSites.map(
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
	isLoadingSites: PropTypes.bool.isRequired
};

export default DiveSitesList;
