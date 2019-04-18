import agent from '../../agent';
import {
	Button,
	Col,
	Modal,
	Row
} from 'react-bootstrap';
import config from '../../config';
import connectToStores from 'alt-utils/lib/connectToStores';
import CurrentLogEntryActions from '../actions/current-log-entry-actions';
import CurrentUserStore from '../../users/stores/current-user-store';
import ErrorActions from '../../actions/error-actions';
import Formsy from 'formsy-react';
import { FromPreferredUnits } from '../../unit-conversion';
import handleError from '../../handle-error';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import TextBox from '../../components/text-box';
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

		this.state = { showConfirmReset: false };

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
		this.handleWeightUpdate = this.handleWeightUpdate.bind(this);
		this.handleGpsUpdate = this.handleGpsUpdate.bind(this);
		this.handleDiscardChanges = this.handleDiscardChanges.bind(this);
		this.handleConfirmDiscardChanges = this.handleConfirmDiscardChanges.bind(this);
		this.handleCancelDiscardChanges = this.handleCancelDiscardChanges.bind(this);
	}

	/* eslint-disable complexity */
	mapModel(model) {
		const mapped = {
			location: model.location,
			site: model.site,
			entryTime: moment(model.entryTime, config.entryTimeFormat).utc().toISOString()
		};

		if (model.bottomTime) {
			mapped.bottomTime = parseFloat(model.bottomTime);
		}

		if (model.totalTime) {
			mapped.totalTime = parseFloat(model.totalTime);
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
		CurrentLogEntryActions.beginLoading();
		try {
			const username = this.props.match.params.username || this.props.currentUser.username;
			const { logId } = this.props.match.params;

			if (logId) {
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
			const username = this.props.match.params.username || this.props.currentUser.username;
			const { logId } = this.props.match.params;

			if (logId) {
				// Update an existing record.
				await agent
					.put(`/api/users/${ username }/logs/${ logId }`)
					.send(model);
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

	handleUpdate(update) {
		const newEntry = {
			...this.props.currentEntry,
			...update
		};
		CurrentLogEntryActions.setCurrentEntry(newEntry);
	}

	handleGpsUpdate(update) {
		if (this.props.currentEntry.gps) {
			const gps = {
				...this.props.currentEntry.gps,
				...update
			};
			CurrentLogEntryActions.setCurrentEntry({
				...this.props.currentEntry,
				gps
			});
		} else {
			CurrentLogEntryActions.setCurrentEntry({
				...this.props.currentEntry,
				gps: update
			});
		}
	}

	handleWeightUpdate(update) {
		if (this.props.currentEntry.weight) {
			const weight = {
				...this.props.currentEntry.weight,
				...update
			};
			CurrentLogEntryActions.setCurrentEntry({
				...this.props.currentEntry,
				weight
			});
		} else {
			CurrentLogEntryActions.setCurrentEntry({
				...this.props.currentEntry,
				weight: update
			});
		}
	}

	renderDepth(value) {
		return value || '';
	}

	renderWeight(value) {
		return value || '';
	}

	/* eslint-disable complexity */
	render() {
		const weight = this.props.currentEntry.weight || {};
		const gps = this.props.currentEntry.gps || {};

		const { distanceUnit, weightUnit } = this.props.currentUser;

		return (
			<Formsy
				onValidSubmit={ this.handleSubmit }
				mapping={ this.mapModel }
				className="form-horizontal"
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
						<h4>Time and Location</h4>
						<TextBox
							name="location"
							controlId="location"
							label="Location"
							placeholder="City or Area"
							required
							onChange={ location => this.handleUpdate({ location }) }
							value={ this.props.currentEntry.location || '' }
							maxLength={ 200 }
							validations={ {
								maxLength: 200
							} }
							validationErrors={ {
								maxLength: 'Location cannot be more than 200 characters long.'
							} }
						/>
						<TextBox
							name="site"
							controlId="site"
							label="Dive site"
							required
							onChange={ site => this.handleUpdate({ site }) }
							value={ this.props.currentEntry.site || '' }
							maxLength={ 200 }
							validations={ {
								maxLength: 200
							} }
							validationErrors={ {
								maxLength: 'Site cannot be more than 200 characters long.'
							} }
						/>
						<TextBox
							name="entryTime"
							controlId="entryTime"
							label="Entry time"
							required
							placeholder={ moment().format(config.entryTimeFormat) }
							onChange={ entryTime => this.handleUpdate({ entryTime }) }
							value={ this.props.currentEntry.entryTime || '' }
							validations={ {
								isDateTime: config.entryTimeFormat
							} }
							validationErrors={ {
								isDateTime: 'Entry time must in the format of yyyy-mm-dd h:mm(am/pm).'
							} }
						/>
						<TextBox
							name="bottomTime"
							controlId="bottomTime"
							label="Bottom time"
							onChange={ bottomTime => this.handleUpdate({ bottomTime }) }
							value={ this.props.currentEntry.bottomTime || '' }
							units="minutes"
							validations={ {
								isGreaterThan: 0
							} }
							validationErrors={ {
								isGreaterThan: 'Bottom time must be a positive number.'
							} }
						/>
						<TextBox
							name="totalTime"
							controlId="totalTime"
							label="Total time"
							onChange={ totalTime => this.handleUpdate({ totalTime }) }
							value={ this.props.currentEntry.totalTime || '' }
							units="minutes"
							validations={ {
								isGreaterThan: 0,
								isGreaterThanOrEqualToField: 'bottomTime'
							} }
							validationErrors={ {
								isGreaterThan: 'Total time must be a positive number.',
								isGreaterThanOrEqualToField:
									'Total time cannot be less than what you recorded for bottom time.'
							} }
						/>
					</Col>
					<Col sm={ 12 } md={ 6 }>
						<h4>GPS</h4>
						<TextBox
							name="gps_latitude"
							controlId="gps_latitude"
							label="Latitude"
							value={ gps.latitude || '' }
							onChange={ latitude => this.handleGpsUpdate({ latitude }) }
							validations={ {
								isBetween: { min: -90.0, max: 90.0 }
							} }
							validationErrors={ {
								isBetween: 'Latitude must be between -90 and 90 degrees.'
							} }
							units="&deg;"
						/>
						<TextBox
							name="gps_longitude"
							controlId="gps_longitude"
							label="Longitude"
							value={ gps.longitude || '' }
							onChange={ longitude => this.handleGpsUpdate({ longitude }) }
							validations={ {
								isBetween: { min: -180.0, max: 180.0 }
							} }
							validationErrors={ {
								isBetween: 'Longitude must be between -180 and 180 degrees.'
							} }
							units="&deg;"
						/>
					</Col>
				</Row>
				<Row>
					<Col md={ 6 } sm={ 12 }>
						<h4>Dive Info</h4>
						<TextBox
							name="averageDepth"
							controlId="averageDepth"
							label="Average depth"
							onChange={ averageDepth => this.handleUpdate({ averageDepth }) }
							value={ this.renderDepth(this.props.currentEntry.averageDepth) }
							units={ distanceUnit }
							validations={ {
								isGreaterThan: 0
							} }
							validationErrors={ {
								isGreaterThan: 'Average depth must be a positive number.'
							} }
						/>
						<TextBox
							name="maxDepth"
							controlId="maxDepth"
							label="Max. depth"
							onChange={ maxDepth => this.handleUpdate({ maxDepth }) }
							value={ this.renderDepth(this.props.currentEntry.maxDepth) }
							units={ distanceUnit }
							validations={ {
								isGreaterThan: 0,
								isGreaterThanOrEqualToField: 'averageDepth'
							} }
							validationErrors={ {
								isGreaterThan: 'Maximum depth must be a positive number.',
								isGreaterThanOrEqualToField:
									'Maximum depth cannot be less than the average depth of the dive.'
							} }
						/>
					</Col>
					<Col md={ 6 } sm={ 12 }>
						<h4>Weight</h4>
						<TextBox
							name="weight_amount"
							controlId="weight_amount"
							label="Amount worn"
							onChange={ amount => this.handleWeightUpdate({ amount }) }
							value={ this.renderWeight(weight.amount) }
							units={ weightUnit }
							validations={ {
								isGreaterThanOrEqual: 0
							} }
							validationErrors={ {
								isGreaterThanOrEqual: 'Amount worn cannot be a negative number.'
							} }
						/>
					</Col>
				</Row>
				<p>
					<em>{ JSON.stringify(this.props.currentEntry) }</em>
				</p>
				<Button id="btn-save" bsStyle="primary" type="submit">Save</Button>
				&nbsp;
				<Button id="btn-reset" onClick={ this.handleConfirmDiscardChanges }>Discard Changes</Button>
			</Formsy>
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
