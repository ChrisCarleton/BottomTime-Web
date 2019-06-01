import { Col, Row } from 'react-bootstrap';
import Formsy from 'formsy-react';
import Map, { Marker } from '../../components/map';
import PropTypes from 'prop-types';
import React from 'react';
import StaticField from '../../components/static-field';
import TagsList from '../../components/tags-list';

class ViewDiveSite extends React.Component {
	render() {
		const { currentDiveSite } = this.props;
		const gps = currentDiveSite.gps || {};

		return (
			<Formsy>
				<Row>
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
							width="100%"
							height="350px"
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
				</Row>
			</Formsy>
		);
	}
}

ViewDiveSite.propTypes = {
	currentDiveSite: PropTypes.object.isRequired
};

export default ViewDiveSite;
