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
		return model;
	}

	handleSubmit(model) {
		console.log(model);
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
						/>
						<TextBox
							name="site"
							controlId="site"
							label="Dive site"
							required
							onChange={ site => this.handleUpdate({ site }) }
							value={ this.props.currentEntry.site || '' }
							maxLength={ 200 }
						/>
						<TextBox
							name="entryTime"
							controlId="entryTime"
							label="Entry time"
							required
							placeholder={ moment().format('YYYY-MM-DD h:mmA') }
							onChange={ entryTime => this.handleUpdate({ entryTime }) }
							value={ this.props.currentEntry.entryTime || '' }
						/>
						<TextBox
							name="bottomTime"
							controlId="bottomTime"
							label="Bottom time"
							onChange={ bottomTime => this.handleUpdate({ bottomTime }) }
							value={ this.props.currentEntry.bottomTime || '' }
							units="minutes"
						/>
						<TextBox
							name="totalTime"
							controlId="totalTime"
							label="Total time"
							onChange={ totalTime => this.handleUpdate({ totalTime }) }
							value={ this.props.currentEntry.totalTime || '' }
							units="minutes"
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
							units="ft"
						/>
						<TextBox
							name="maxDepth"
							controlId="maxDepth"
							label="Max. depth"
							onChange={ maxDepth => this.handleUpdate({ maxDepth }) }
							value={ this.props.currentEntry.maxDepth || '' }
							units="ft"
						/>
					</Col>
					<Col md={ 6 } sm={ 12 }>
						<h4>Weight</h4>
						<TextBox
							name="amount"
							controlId="amount"
							label="Amount worn"
							onChange={ amount => this.handleWeightUpdate({ amount }) }
							value={ weight.amount || '' }
							units="lbs"
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
	history: PropTypes.object.isRequired,
	isLoading: PropTypes.bool.isRequired,
	match: PropTypes.object.isRequired
};

export default connectToStores(withRouter(LogEntry));
