import agent from '../../agent';
import {
	Button,
	Col,
	Glyphicon,
	Modal,
	Nav,
	NavItem,
	Row
} from 'react-bootstrap';
import Conditions from './edit-conditions';
import connectToStores from 'alt-utils/lib/connectToStores';
import CurrentLogEntryActions from '../actions/current-log-entry-actions';
import CurrentUserStore from '../../users/stores/current-user-store';
import DiveInfo from './edit-dive-info';
import ErrorActions from '../../actions/error-actions';
import Formsy from 'formsy-react';
import handleError from '../../handle-error';
import LogEntryUtilities from './log-entry-utilities';
import OtherInfo from './edit-other-info';
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
	}

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
		if (!LogEntryUtilities.postValidate(model, invalidateForm)) {
			this.showValidationError();
			return;
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

	render() {
		const { currentEntry, currentUser } = this.props;
		const { distanceUnit, pressureUnit, temperatureUnit, weightUnit } = currentUser;

		return (
			<div>
				<Col smHidden md={ 2 }>
					<Nav bsStyle="pills" activeKey={ 0 } stacked>
						<NavItem eventKey={ 0 }>
							<Glyphicon glyph="map-marker" />&nbsp;&nbsp;Time and Place
						</NavItem>
						<NavItem eventKey={ 1 }>
							<Glyphicon glyph="dashboard" />&nbsp;&nbsp;Dive Info
						</NavItem>
						<NavItem eventKey={ 2 }>
							<Glyphicon glyph="sunglasses" />&nbsp;&nbsp;Conditions
						</NavItem>
						<NavItem eventKey={ 3 }>
							<Glyphicon glyph="pencil" />&nbsp;&nbsp;Notes
						</NavItem>
					</Nav>
				</Col>
				<Col sm={ 12 } md={ 10 }>
					<Formsy
						onValidSubmit={ this.handleSubmit }
						onInvalidSubmit={ this.handleInvalidSubmit }
						mapping={ LogEntryUtilities.mapFormValues }
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
						<Conditions
							temperatureUnit={ temperatureUnit }
							currentEntry={ currentEntry }
						/>
						<OtherInfo currentEntry={ currentEntry } />
						<Button id="btn-save" bsStyle="primary" type="submit">Save</Button>
						&nbsp;
						<Button id="btn-reset" onClick={ this.handleConfirmDiscardChanges }>Discard Changes</Button>
					</Formsy>
				</Col>
			</div>
		);
	}
}

EditLogEntry.propTypes = {
	currentEntry: PropTypes.object.isRequired,
	currentUser: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	match: PropTypes.object.isRequired
};

export default connectToStores(withRouter(EditLogEntry));
