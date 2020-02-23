import { Badge, Media } from 'react-bootstrap';
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
			diveSites
		} = this.props;

		if (isLoadingSites) {
			return <LoadingSpinner message="Loading dive sites..." />;
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
	isLoadingSites: PropTypes.bool.isRequired
};

export default connectToStores(DiveSitesList);
