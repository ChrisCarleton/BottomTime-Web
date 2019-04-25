import agent from '../../agent';
import {
	Button,
	Col,
	Modal,
	Nav,
	NavItem,
	Row
} from 'react-bootstrap';
import config from '../../config';
import connectToStores from 'alt-utils/lib/connectToStores';
import CurrentLogEntryActions from '../actions/current-log-entry-actions';
import CurrentUserStore from '../../users/stores/current-user-store';
import DiveInfo from './edit-dive-info';
import ErrorActions from '../../actions/error-actions';
import Formsy from 'formsy-react';
import { FromPreferredUnits } from '../../unit-conversion';
import handleError from '../../handle-error';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import TextBox from '../../components/text-box';
import TimeAndPlace from './edit-time-place';
import { withRouter } from 'react-router-dom';

class EditLogEntry extends React.Component {
	static getStores() {
		return [ CurrentUserStore ];
	}

	static getPropsFromStores() {
		return {
			currentUser: CurrentUserStore.getState().currentUser
		};
	}

	constructor(props) {
		super(props);

		this.form = React.createRef();
		this.state = { showConfirmReset: false };

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDiscardChanges = this.handleDiscardChanges.bind(this);
		this.handleConfirmDiscardChanges = this.handleConfirmDiscardChanges.bind(this);
		this.handleCancelDiscardChanges = this.handleCancelDiscardChanges.bind(this);
		this.mapModel = this.mapModel.bind(this);
	}

	/* eslint-disable complexity */
	mapModel(model) {
		const mapped = {
			location: model.location,
			site: model.site,
			entryTime: moment(model.entryTime, config.entryTimeFormat).utc().toISOString()
		};

		if (model.diveNumber) {
			mapped.diveNumber = parseInt(model.diveNumber, 10);
		}

		if (model.bottomTime) {
			mapped.bottomTime = parseFloat(model.bottomTime);
		}

		if (model.totalTime) {
			mapped.totalTime = parseFloat(model.totalTime);
		}

		if (model.surfaceInterval) {
			mapped.surfaceInterval = parseFloat(model.surfaceInterval);
		}

		if (model.gps_latitude || model.gps_longitude) {
			mapped.gps = {};

			if (model.gps_latitude) {
				mapped.gps.latitude = parseFloat(model.gps_latitude);
			}

			if (model.gps_longitude) {
				mapped.gps.longitude = parseFloat(model.gps_longitude);
			}
		}

		if (model.averageDepth) {
			mapped.averageDepth = FromPreferredUnits.Distance[this.props.currentUser.distanceUnit](
				parseFloat(model.averageDepth)
			);
		}

		if (model.maxDepth) {
			mapped.maxDepth = FromPreferredUnits.Distance[this.props.currentUser.distanceUnit](
				parseFloat(model.maxDepth)
			);
		}

		if (model.weight_amount) {
			mapped.weight = {
				amount: FromPreferredUnits.Weight[this.props.currentUser.weightUnit](
					parseFloat(model.weight_amount)
				)
			};
		}

		return mapped;
	}
	/* eslint-enable complexity */

	showValidationError() {
		ErrorActions.showError(
			'There were validation errors',
			'Check your input and try again.'
		);
	}

	handleConfirmDiscardChanges() {
		this.setState({ ...this.state, showConfirmReset: true });
	}

	async handleDiscardChanges() {
		this.setState({ ...this.state, showConfirmReset: false });

		try {
			const username = this.props.match.params.username || this.props.currentUser.username;
			const { logId } = this.props.match.params;

			this.form.current.reset();
			if (logId) {
				CurrentLogEntryActions.beginLoading();
				const response = await agent
					.get(`/api/users/${ username }/logs/${ logId }`);
				CurrentLogEntryActions.setCurrentEntry(response.body);
			} else {
				CurrentLogEntryActions.setCurrentEntry({});
			}

			ErrorActions.showSuccess('Log entry changes have been discarded.');
		} catch (err) {
			CurrentLogEntryActions.finishLoading();
			handleError(err);
		}
	}

	handleCancelDiscardChanges() {
		this.setState({ ...this.state, showConfirmReset: false });
	}

	handleInvalidSubmit() {
		ErrorActions.showError(
			'There is a problem with one or more of your values',
			'Check below for the error.'
		);
	}

	async handleSubmit(model, resetForm, invalidateForm) {
		if (model.gps) {
			if (!model.gps.latitude && model.gps.longitude) {
				invalidateForm({
					'gps_latitude': 'Latitude is required if longitude is entered.'
				});
				this.showValidationError();
				return;
			}

			if (!model.gps.longitude && model.gps.latitude) {
				invalidateForm({
					'gps_longitude': 'Longitude is required if latitude is entered.'
				});
				this.showValidationError();
				return;
			}
		}

		try {
			const { currentUser, match } = this.props;
			const username = match.params.username || currentUser.username;
			const { logId } = match.params;

			if (logId) {
				// Update an existing record.
				await agent
					.put(`/api/users/${ username }/logs/${ logId }`)
					.send(model);
				CurrentLogEntryActions.setCurrentEntry(model);
			} else {
				// Save a new record and redirect to that record's page.
				const response = await agent
					.post(`/api/users/${ username }/logs`)
					.send([ model ]);
				CurrentLogEntryActions.setCurrentEntry(response.body[0]);
				this.props.history.push(`/logs/${ username }/${ response.body[0].entryId }`);
			}

			ErrorActions.showSuccess('Record was saved succesfully.');
		} catch (err) {
			handleError(err, this.props.history);
		}
	}

	/* eslint-disable complexity */
	render() {
		const { currentEntry, currentUser } = this.props;

		const temperature = currentEntry.temperature || {};
		temperature.thermoclines = temperature.thermoclines || [];
		temperature.thermoclines[0] = temperature.thermoclines[0] || {};

		const { distanceUnit, pressureUnit, weightUnit } = currentUser;
		let temperatureUnit = '°C';
		let temperatureLowerBoundError = 'Temperature cannot be below -2°C.';
		let temperatureUpperBoundError = 'Temperature cannot be above 50°C.';

		if (currentUser.temperatureUnit === 'f') {
			temperatureUnit = '°F';
			temperatureLowerBoundError = 'Temperature cannot be below 28.4°F.';
			temperatureUpperBoundError = 'Temperature cannot be above 122°F.';
		}

		return (
			<div>
				<Col smHidden md={ 2 }>
					<Nav bsStyle="pills" activeKey={ 0 } stacked>
						<NavItem eventKey={ 0 }>Time and Location</NavItem>
						<NavItem eventKey={ 1 }>Dive Info</NavItem>
						<NavItem eventKey={ 2 }>Conditions</NavItem>
					</Nav>
				</Col>
				<Col sm={ 12 } md={ 10 }>
					<Formsy
						onValidSubmit={ this.handleSubmit }
						onInvalidSubmit={ this.handleInvalidSubmit }
						mapping={ this.mapModel }
						className="form-horizontal"
						ref={ this.form }
					>
						<Modal show={ this.state.showConfirmReset }>
							<Modal.Header>
								<Modal.Title>Confirm Reset</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<p>
									Are you sure you want to discard all of the changes you have made?
								</p>
							</Modal.Body>
							<Modal.Footer>
								<Button
									id="btn-confirm-discard"
									bsStyle="primary"
									onClick={ this.handleDiscardChanges }
								>
									Yes
								</Button>
								&nbsp;
								<Button id="btn-cancel-discard" onClick={ this.handleCancelDiscardChanges }>No</Button>
							</Modal.Footer>
						</Modal>
						<Row>
							<Col sm={ 12 } md={ 6 }>
								<TextBox
									autoFocus
									name="diveNumber"
									controlId="diveNumber"
									label="Dive number"
									value={ currentEntry.diveNumber || '' }
									validations={ {
										isInt: true,
										isGreaterThan: 0
									} }
									validationErrors={ {
										isInt: 'Dive number must be an integer.',
										isGreaterThan: 'Dive number must be positive.'
									} }
								/>
							</Col>
						</Row>
						<TimeAndPlace currentEntry={ currentEntry } />
						<DiveInfo
							currentEntry={ currentEntry }
							distanceUnit={ distanceUnit }
							pressureUnit={ pressureUnit }
							weightUnit={ weightUnit }
						/>
						{/* <Row>
							<Col sm={ 12 } md={ 6 }>
								<TextBox
									name="temperature_surface"
									controlId="temperature_surface"
									label="Surface temp"
									value={ this.renderTemperature(temperature.surface) || '' }
									units={ temperatureUnit }
									validations={ {
										isNumeric: true,
										isGreaterThanOrEqual: -2,
										isLessThanOrEqual: 50
									} }
									validationErrors={ {
										isNumeric: 'Temperature must be a number',
										isGreaterThanOrEqual: temperatureLowerBoundError,
										isLessThanOrEqual: temperatureUpperBoundError
									} }
								/>
								<TextBox
									name="temperature_water"
									controlId="temperature_water"
									label="Water temp"
									value={ this.renderTemperature(temperature.water) || '' }
									units={ temperatureUnit }
									validations={ {
										isNumeric: true,
										isGreaterThanOrEqual: -2,
										isLessThanOrEqual: 50
									} }
									validationErrors={ {
										isNumeric: 'Temperature must be a number',
										isGreaterThanOrEqual: temperatureLowerBoundError,
										isLessThanOrEqual: temperatureUpperBoundError
									} }
								/>
								<TextBox
									name="temperature_thermocline"
									controlId="temperature_thermocline"
									label="Thermocline"
									value={ this.renderTemperature(temperature.thermoclines[0].temperature) || '' }
									units={ temperatureUnit }
									validations={ {
										isNumeric: true,
										isGreaterThanOrEqual: -2,
										isLessThanOrEqual: 50
									} }
									validationErrors={ {
										isNumeric: 'Temperature must be a number',
										isGreaterThanOrEqual: temperatureLowerBoundError,
										isLessThanOrEqual: temperatureUpperBoundError
									} }
								/>
							</Col>
						</Row> */}
						<Button id="btn-save" bsStyle="primary" type="submit">Save</Button>
						&nbsp;
						<Button id="btn-reset" onClick={ this.handleConfirmDiscardChanges }>Discard Changes</Button>
					</Formsy>
				</Col>
			</div>
		);
	}
	/* eslint-enable complexity */
}

EditLogEntry.propTypes = {
	currentEntry: PropTypes.object.isRequired,
	currentUser: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	match: PropTypes.object.isRequired
};

export default connectToStores(withRouter(EditLogEntry));
