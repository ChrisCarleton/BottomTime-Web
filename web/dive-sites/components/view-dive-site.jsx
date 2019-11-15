import { Col, Row } from 'react-bootstrap';
import DiveSiteDetails from './dive-site-details';
import FormGroup from '../../components/form-group';
import Formsy from 'formsy-react';
import Map, { Marker } from '../../components/map';
import PropTypes from 'prop-types';
import React from 'react';
import StaticField from '../../components/static-field';
import TagsList from '../../components/tags-list';

class ViewDiveSite extends React.Component {
	renderSiteDetailsSection(currentDiveSite) {
		return (
			<Col sm={ 12 } md={ 6 }>
				<h4>Site Details</h4>
				<StaticField
					controlId="location"
					name="location"
					label="Location"
					value={ currentDiveSite.location }
				/>
				<StaticField
					controlId="country"
					name="country"
					label="Country"
					value={ currentDiveSite.country }
				/>
				<FormGroup
					controlId="details"
					name="details"
					label="Site details"
				>
					<DiveSiteDetails diveSite={ currentDiveSite } />
				</FormGroup>
				<TagsList
					controlId="tags"
					name="tags"
					label="Tags"
					value={ currentDiveSite.tags }
				/>
				<StaticField
					controlId="description"
					name="description"
					label="Description"
					value={ currentDiveSite.description }
				/>
			</Col>
		);
	}

	renderLocationSection(currentDiveSite) {
		const gps = currentDiveSite.gps || {};
		return (
			<Col sm={ 12 } md={ 6 }>
				<h4>Location</h4>
				<Row>
					<Col sm={ 6 }>
						<StaticField
							controlId="gps.lat"
							name="gps.lat"
							label="Latitude"
							value={ gps.lat }
						/>
					</Col>
					<Col sm={ 6 }>
						<StaticField
							controlId="gps.lon"
							name="gps.lon"
							label="Longitude"
							value={ gps.lon }
						/>
					</Col>
				</Row>
				<Map
					onClick={ this.handleMapClicked }
					initialCenter={ gps }
				>
					{
						gps.lat && gps.lon
							? (
								<Marker
									position={ {
										lat: gps.lat,
										lng: gps.lon
									} }
								/>
							)
							: null
					}
				</Map>
			</Col>
		);
	}

	render() {
		const { currentDiveSite } = this.props;
		return (
			<Formsy>
				<Row>
					{ this.renderSiteDetailsSection(currentDiveSite) }
					{ this.renderLocationSection(currentDiveSite) }
				</Row>
			</Formsy>
		);
	}
}

ViewDiveSite.propTypes = {
	currentDiveSite: PropTypes.object.isRequired
};

export default ViewDiveSite;
