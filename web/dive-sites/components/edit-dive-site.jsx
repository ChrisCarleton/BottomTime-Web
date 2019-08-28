import agent from '../../agent';
import {
	Button,
	ButtonGroup,
	ButtonToolbar,
	Col,
	Row
} from 'react-bootstrap';
import CurrentDiveSiteActions from '../actions/current-site-actions';
import DiveSiteUtils from '../utils/dive-site-utils';
import ErrorActions from '../../actions/error-actions';
import Formsy from 'formsy-react';
import handleError from '../../handle-error';
import Map, { Marker } from '../../components/map';
import PropTypes from 'prop-types';
import RadioList from '../../components/radio-list';
import React from 'react';
import RequireUser from '../../components/require-user';
import Slider from '../../components/slider';
import Tags from '../../components/tags';
import TextArea from '../../components/text-area';
import TextBox from '../../components/text-box';
import { withRouter } from 'react-router-dom';
import { isBoolean } from 'util';

class EditDiveSite extends React.Component {
	constructor(props) {
		super(props);

		this.formRef = React.createRef();
		this.submitBehavior = 'new';

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async handleSubmit(model, resetForm, invalidateForm) {
		if (!DiveSiteUtils.postSubmitValidation(model, invalidateForm)) {
			return;
		}

		const successfulSaveMessage = 'Dive site info has been saved.';
		const { siteId } = this.props.match.params;

		try {
			if (siteId) {
				await agent
					.put(`/api/diveSites/${ siteId }`)
					.send(model);
				CurrentDiveSiteActions.updateCurrentDiveSite(model);
				ErrorActions.showSuccess(successfulSaveMessage);
			} else {
				const { body } = await agent
					.post('/api/diveSites')
					.send([ model ]);
				CurrentDiveSiteActions.updateCurrentDiveSite(body[0]);
				ErrorActions.showSuccess(successfulSaveMessage);
				this.props.history.push(`/diveSites/${ body[0].siteId }`);
			}
		} catch (err) {
			handleError(err, this.props.history);
		}
	}

	handleInvalidSubmit() {
		ErrorActions.showError(
			'There is a problem with one or more of your values',
			'Check below for the error.'
		);
	}

	handleMapClicked(latLng) {
		CurrentDiveSiteActions.updateGpsCoords(latLng);
	}

	/* eslint-disable complexity */
	render() {
		const {
			currentDiveSite
		} = this.props;
		const gps = currentDiveSite.gps || {};
		const entryFee = isBoolean(currentDiveSite.entryFee)
			? currentDiveSite.entryFee.toString()
			: null;

		return (
			<Formsy
				mapping={ DiveSiteUtils.mapFormValues }
				onValidSubmit={ this.handleSubmit }
				onInvalidSubmit={ this.handleInvalidSubmit }
				ref={ this.formRef }
			>
				<RequireUser />
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
						<RadioList
							controlId="water"
							name="water"
							label="Type of water"
							inline
							value={ currentDiveSite.water }
						>
							{
								[
									{ text: 'Fresh water', value: 'fresh' },
									{ text: 'Salt water', value: 'salt' }
								]
							}
						</RadioList>
						<RadioList
							controlId="entryFee"
							name="entryFee"
							label="Entry fee"
							inline
							value={ entryFee }
						>
							{
								[
									{ text: 'Fee required', value: 'true' },
									{ text: 'Free to dive', value: 'false' }
								]
							}
						</RadioList>
						<RadioList
							controlId="accessibility"
							name="accessibility"
							label="Accessibility"
							inline
							value={ currentDiveSite.accessibility }
						>
							{
								[
									{ text: 'Shore dive', value: 'shore' },
									{ text: 'Boat dive', value: 'boat' }
								]
							}
						</RadioList>
						<Slider
							controlId="difficulty"
							name="difficulty"
							label="Difficulty"
							value={ currentDiveSite.difficulty }
							min={ 1.0 }
							max={ 5.0 }
							lowEndCaption="Easy / Novice"
							highEndCaption="Technical / Extremely Challenging"
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
								<TextBox
									controlId="gps.lat"
									name="gps.lat"
									label="Latitude"
									value={ gps.lat || '' }
								/>
							</Col>
							<Col sm={ 6 }>
								<TextBox
									controlId="gps.lon"
									name="gps.lon"
									label="Longitude"
									value={ gps.lon || '' }
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
	currentDiveSite: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	match: PropTypes.object.isRequired
};

export default withRouter(EditDiveSite);
