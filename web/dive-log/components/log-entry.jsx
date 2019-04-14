import agent from '../../agent';
import {
	Breadcrumb,
	Button,
	Col,
	Row
} from 'react-bootstrap';
import connectToStores from 'alt-utils/lib/connectToStores';
import CurrentLogEntryActions from '../actions/current-log-entry-actions';
import CurrentLogEntryStore from '../stores/current-log-entry-store';
import CurrentUserStore from '../../users/stores/current-user-store';
import Formsy from 'formsy-react';
import handleError from '../../handle-error';
import { LinkContainer } from 'react-router-bootstrap';
import LoadingSpinner from '../../components/loading-spinner';
import moment from 'moment';
import PageTitle from '../../components/page-title';
import PropTypes from 'prop-types';
import React from 'react';
import TextBox from '../../components/text-box';
import { withRouter } from 'react-router-dom';

const EntryTimeFormat = 'YYYY-MM-DD h:mmA';

class LogEntry extends React.Component {
	static getStores() {
		return [ CurrentLogEntryStore, CurrentUserStore ];
	}

	static getPropsFromStores() {
		return {
			currentUser: CurrentUserStore.getState().currentUser,
			...CurrentLogEntryStore.getState()
		};
	}

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
		this.handleWeightUpdate = this.handleWeightUpdate.bind(this);
	}

	componentDidMount() {
		setTimeout(async () => {
			const { params } = this.props.match;

			if (params.logId) {
				CurrentLogEntryActions.beginLoading();
				try {
					const response = await agent
						.get(`/api/users/${ params.username }/logs/${ params.logId }`);
					CurrentLogEntryActions.setCurrentEntry(response.body);
				} catch (err) {
					CurrentLogEntryActions.finishLoading();
					handleError(err, this.props.history);
				}
			} else {
				CurrentLogEntryActions.finishLoading();
			}
		}, 0);
	}

	mapModel(model) {
		const mapped = {
			location: model.location,
			site: model.site
		};

		if (model.entryTime) {
			mapped.entryTime = moment(model.entryTime, EntryTimeFormat).utc().toISOString();
		}

		if (model.bottomTime) {
			mapped.bottomTime = parseFloat(model.bottomTime);
		}

		if (model.totalTime) {
			mapped.totalTime = parseFloat(model.totalTime);
		}

		if (model.longitude) {
			mapped.gps = {
				longitude: model.longitude,
				latitude: model.latitude
			};
		}

		if (model.averageDepth) {
			mapped.averageDepth = parseFloat(model.averageDepth);
		}

		if (model.maxDepth) {
			mapped.maxDepth = parseFloat(model.maxDepth);
		}

		if (model.weightAmount) {
			mapped.weight = {
				amount: parseFloat(model.weightAmount)
			};
		}

		return mapped;
	}

	async handleSubmit(model) {
		try {
			const username = this.props.match.params.username || this.props.currentUser.username;
			const response = await agent
				.post(`/api/users/${ username }/logs`)
				.send([ model ]);
			CurrentLogEntryActions.setCurrentEntry(response.body[0]);
			if (!this.props.match.params.logId) {
				this.props.history.push(`/logs/${ username }/${ response.body[0].entryId }`);
			}
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

	renderForm() {
		const weight = this.props.currentEntry.weight || {};

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
							name="latitude"
							controlId="latitude"
							label="Latitude"
						/>
						<TextBox
							name="longitude"
							controlId="longitude"
							label="Longitude"
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
							name="weightAmount"
							controlId="weightAmount"
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

	render() {
		const logsListPage = `/logs/${ this.props.match.params.username }`;
		const pageTitle = 'Log Entry';

		return (
			<div>
				<Breadcrumb>
					<LinkContainer to="/">
						<Breadcrumb.Item>Home</Breadcrumb.Item>
					</LinkContainer>
					<LinkContainer to={ logsListPage }>
						<Breadcrumb.Item>Log Book</Breadcrumb.Item>
					</LinkContainer>
					<Breadcrumb.Item active>{ pageTitle }</Breadcrumb.Item>
				</Breadcrumb>
				<PageTitle title={ pageTitle } />
				{
					this.props.isLoading
						? <LoadingSpinner message="Loading Log Entry..." />
						: this.renderForm()
				}
			</div>
		);
	}
}

LogEntry.propTypes = {
	currentEntry: PropTypes.object.isRequired,
	currentUser: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	isLoading: PropTypes.bool.isRequired,
	match: PropTypes.object.isRequired
};

export default connectToStores(withRouter(LogEntry));
