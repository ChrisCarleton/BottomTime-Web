import { Image, Media } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

class DiveSitesListItem extends React.Component {
	render() {
		const { diveSite } = this.props;
		return (
			<Media.ListItem>
				<Media.Left>
					<Image src="/img/dive-site-flag.png" />
				</Media.Left>
				<Media.Body>
					<Media.Heading>
						<Link to={ `/diveSites/${ diveSite.siteId }` }>{ diveSite.name }</Link>
					</Media.Heading>
				</Media.Body>
			</Media.ListItem>
		);
	}
}

DiveSitesListItem.propTypes = {
	diveSite: PropTypes.object.isRequired
};

export default DiveSitesListItem;
