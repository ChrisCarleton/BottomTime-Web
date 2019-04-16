import agent from '../../agent';
import {
	Button,
	Col,
	Row
} from 'react-bootstrap';
import CurrentLogEntryActions from '../actions/current-log-entry-actions';
import ErrorActions from '../../actions/error-actions';
import Formsy from 'formsy-react';
import handleError from '../../handle-error';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import TextBox from '../../components/text-box';
import { withRouter } from 'react-router-dom';

const EntryTimeFormat = 'YYYY-MM-DD h:mmA';

class EditLogEntry extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
		this.handleWeightUpdate = this.handleWeightUpdate.bind(this);
		this.handleGpsUpdate = this.handleGpsUpdate.bind(this);
	}

	/* eslint-disable complexity */
	mapModel(model) {
		const mapped = {
			location: model.location,
			site: model.site,
			entryTime: moment(model.entryTime, EntryTimeFormat).utc().toISOString()
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
			mapped.averageDepth = parseFloat(model.averageDepth);
		}

		if (model.maxDepth) {
			mapped.maxDepth = parseFloat(model.maxDepth);
		}

		if (model.weight_amount) {
			mapped.weight = {
				amount: parseFloat(model.weight_amount)
			};
		}

		return mapped;
	}
	/* eslint-enable complexity */

	async handleSubmit(model, resetForm, invalidateForm) {
		if (model.gps) {
			if (!model.gps.latitude && model.gps.longitude) {
				invalidateForm({
					'gps_latitude': 'Latitude is required if longitude is entered.'
				});
				ErrorActions.showError(
					'There were validation errors',
					'Check your input and try again.'
				);
				return;
			}

			if (!model.gps.longitude && model.gps.latitude) {
				invalidateForm({
					'gps_longitude': 'Longitude is required if latitude is entered.'
				});
				ErrorActions.showError(
					'There were validation errors',
					'Check your input and try again.'
				);
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

	/* eslint-disable complexity */
	render() {
		const weight = this.props.currentEntry.weight || {};
		const gps = this.props.currentEntry.gps || {};

		return (
			<Formsy onValidSubmit={ this.handleSubmit } mapping={ this.mapModel }>
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
							placeholder={ moment().format(EntryTimeFormat) }
							onChange={ entryTime => this.handleUpdate({ entryTime }) }
							value={ this.props.currentEntry.entryTime || '' }
							validations={ {
								isDateTime: EntryTimeFormat
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
								isGreaterThan: 0
							} }
							validationErrors={ {
								isGreaterThan: 'Total time must be a positive number.'
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
							units="°"
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
							units="°"
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
							value={ this.props.currentEntry.averageDepth || '' }
							units="m"
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
							value={ this.props.currentEntry.maxDepth || '' }
							units="m"
							validations={ {
								isGreaterThan: 0
							} }
							validationErrors={ {
								isGreaterThan: 'Maximum depth must be a positive number.'
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
							value={ weight.amount || '' }
							units="kg"
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
				<Button id="btn-reset">Discard Changes</Button>
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

export default withRouter(EditLogEntry);
