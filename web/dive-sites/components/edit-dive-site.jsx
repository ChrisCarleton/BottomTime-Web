import {
	Button,
	ButtonGroup,
	ButtonToolbar,
	ControlLabel,
	FormControl,
	Col,
	Row
} from 'react-bootstrap';
import CurrentDiveSiteActions from '../actions/current-site-actions';
import Formsy from 'formsy-react';
import Map, { Marker } from '../../components/map';
import PropTypes from 'prop-types';
import React from 'react';
import Tags from '../../components/tags';
import TextArea from '../../components/text-area';
import TextBox from '../../components/text-box';

class EditDiveSite extends React.Component {
	handleMapClicked(latLng) {
		CurrentDiveSiteActions.updateGpsCoords(latLng);
	}

	/* eslint-disable complexity */
	render() {
		const {
			currentDiveSite
		} = this.props;
		const gps = currentDiveSite.gps || {};

		return (
			<Formsy>
				<Row>
					<Col sm={ 12 } md={ 6 }>
						<h4>Site Details</h4>
						<TextBox
							autoFocus
							controlId="name"
							name="name"
							label="Site name"
							required
							maxLength={ 200 }
							value={ currentDiveSite.name || '' }
						/>
						<TextBox
							controlId="location"
							name="location"
							label="Location"
							placeholder="E.g. city, region, or area where the site is located."
							maxLength={ 100 }
							value={ currentDiveSite.location || '' }
						/>
						<TextBox
							controlId="country"
							name="country"
							label="Country"
							maxLength={ 100 }
							value={ currentDiveSite.country || '' }
						/>
						<Tags
							controlId="tags"
							name="tags"
							label="Tags"
							value={ currentDiveSite.tags || [] }
						/>
						<TextArea
							controlId="description"
							name="description"
							label="Description"
							maxLength={ 1000 }
							value={ currentDiveSite.description || '' }
						/>
					</Col>
					<Col sm={ 12 } md={ 6 }>
						<h4>Location</h4>
						<Row>
							<Col sm={ 6 }>
								<ControlLabel>Latitude:</ControlLabel>
								<FormControl value={ gps.lat || '' } />
							</Col>
							<Col sm={ 6 }>
								<ControlLabel>Longitude:</ControlLabel>
								<FormControl value={ gps.lon || '' } />
							</Col>
						</Row>
						<Map
							onClick={ this.handleMapClicked }
							width="100%"
							height="350px"
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
				<ButtonToolbar>
					<ButtonGroup>
						<Button bsStyle="primary" type="submit">Save</Button>
					</ButtonGroup>
					<ButtonGroup>
						<Button>Cancel</Button>
					</ButtonGroup>
				</ButtonToolbar>
			</Formsy>
		);
	}
	/* eslint-enable complexity */
}

EditDiveSite.propTypes = {
	currentDiveSite: PropTypes.object.isRequired
};

export default EditDiveSite;
