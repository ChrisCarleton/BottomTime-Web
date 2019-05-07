import agent from '../../agent';
import {
	Breadcrumb,
	Button,
	ButtonGroup,
	ButtonToolbar,
	Clearfix,
	Glyphicon,
	Label,
	Modal,
	ToggleButton,
	ToggleButtonGroup
} from 'react-bootstrap';
import connectToStores from 'alt-utils/lib/connectToStores';
import CurrentUserStore from '../../users/stores/current-user-store';
import handleError from '../../handle-error';
import { LinkContainer } from 'react-router-bootstrap';
import LogEntryActions from '../actions/log-entry-actions';
import LogEntryStore from '../stores/log-entry-store';
import LogsListGrid from './logs-list-grid';
import PageTitle from '../../components/page-title';
import PropTypes from 'prop-types';
import React from 'react';
import RequireUser from '../../components/require-user';
import { withRouter } from 'react-router-dom';

require('../../img/diver-icon.png');

class LogsList extends React.Component {
	static getStores() {
		return [ CurrentUserStore, LogEntryStore ];
	}

	static getPropsFromStores() {
		return {
			currentUser: CurrentUserStore.getState().currentUser,
			...LogEntryStore.getState()
		};
	}

	constructor(props) {
		super(props);

		let username = null;
		let possessive = null;

		/* eslint-disable prefer-destructuring */
		if (this.props.match.params.username) {
			username = props.match.params.username;
		} else if (!this.props.currentUser.isAnonymous) {
			username = props.currentUser.username;
		}
		/* eslint-enable prefer-destructuring */

		if (!username || username === props.currentUser.username) {
			possessive = 'My';
		} else if (
			username.charAt(username.length - 1) === 's'
			|| username.charAt(username.length - 1) === 'S'
		) {
			possessive = `${ username }'`;
		} else {
			possessive = `${ username }'s`;
		}

		this.state = {
			username,
			possessive,
			isConfirmDeleteVisible: false,
			recordsToBeDeleted: []
		};

		this.handleSortByChanged = this.handleSortByChanged.bind(this);
		this.handleSortOrderChanged = this.handleSortOrderChanged.bind(this);
		this.handleBulkDelete = this.handleBulkDelete.bind(this);
		this.handleConfirmBulkDelete = this.handleConfirmBulkDelete.bind(this);
		this.handleCancelBulkDelete = this.handleCancelBulkDelete.bind(this);
		this.renderModal = this.renderModal.bind(this);
		this.searchLogs = this.searchLogs.bind(this);
	}

	componentDidMount() {
		setTimeout(this.searchLogs, 0);
	}

	async searchLogs(params) {
		const { username } = this.state;
		if (!username) {
			return;
		}

		params = params || {
			sortBy: this.props.sortBy,
			sortOrder: this.props.sortOrder
		};

		try {
			LogEntryActions.searchLogs();
			const results = await agent
				.get(`/api/users/${ username }/logs`)
				.query(params);
			LogEntryActions.searchLogsCompleted(results.body);
		} catch (err) {
			LogEntryActions.searchLogsFailed();
			handleError(err, this.props.history);
		}
	}

	handleBulkDelete() {
		const recordsToBeDeleted = [];
		const { listEntries } = this.props;

		listEntries.forEach(entry => {
			if (entry.checked) {
				recordsToBeDeleted.push(entry.entryId);
			}
		});

		this.setState({
			...this.state,
			isConfirmDeleteVisible: true,
			recordsToBeDeleted
		});
	}

	async handleConfirmBulkDelete() {
		this.handleCancelBulkDelete();
		try {
			await agent
				.del(`/api/users/${ this.state.username }/logs`)
				.send(this.state.recordsToBeDeleted);
			await this.searchLogs();
		} catch (err) {
			handleError(err, this.props.history);
		}
	}

	handleCancelBulkDelete() {
		this.setState({
			...this.state,
			isConfirmDeleteVisible: false
		});
	}

	handleSortByChanged(value) {
		LogEntryActions.changeSortOrder(value, 'desc');
		this.searchLogs({
			sortBy: value,
			sortOrder: 'desc'
		});
	}

	handleSortOrderChanged(value) {
		const { sortBy } = this.props;
		const sortOrder = value[0] === 'asc' ? 'asc' : 'desc';

		LogEntryActions.changeSortOrder(sortBy, sortOrder);
		this.searchLogs({ sortBy, sortOrder });
	}

	renderModal() {
		const recordCount = this.state.recordsToBeDeleted.length;
		const message = recordCount > 0
			? <p>Are you sure you want to permanently delete the <strong>{ recordCount }</strong> selected dives?</p>
			: (
				<p>
					There are no dives selected.
					Please check off the dives you wish to delete before clicking the Delete button.
				</p>
			);
		const footer = recordCount > 0
			? (
				<Modal.Footer>
					<Button
						id="btn-confirm-delete"
						bsStyle="primary"
						onClick={ this.handleConfirmBulkDelete }
					>
						<Glyphicon glyph="trash" />&nbsp;Yes
					</Button>
					&nbsp;
					<Button id="btn-cancel-delete" onClick={ this.handleCancelBulkDelete }>
						No
					</Button>
				</Modal.Footer>
			)
			: (
				<Modal.Footer>
					<Button
						id="btn-cancel-delete"
						bsStyle="primary"
						onClick={ this.handleCancelBulkDelete }
					>
						Ok
					</Button>
				</Modal.Footer>
			);

		return (
			<Modal show={ this.state.isConfirmDeleteVisible }>
				<Modal.Header>
					<Modal.Title>Confirm Delete</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{ message }
				</Modal.Body>
				{ footer }
			</Modal>
		);
	}

	render() {
		if (!this.state.username) {
			return <RequireUser />;
		}

		let reverseOrderText = null;
		switch (this.props.sortBy) {
		case 'maxDepth':
			reverseOrderText = 'Shallowest first';
			break;

		case 'bottomTime':
			reverseOrderText = 'Shortest first';
			break;

		default:
			reverseOrderText = 'Oldest first';
			break;
		}

		return (
			<div>
				{ this.renderModal() }
				<Breadcrumb>
					<LinkContainer to="/">
						<Breadcrumb.Item>Home</Breadcrumb.Item>
					</LinkContainer>
					<Breadcrumb.Item active>Log Book</Breadcrumb.Item>
				</Breadcrumb>

				<PageTitle title={ `${ this.state.possessive } Log Book` } />

				<ButtonToolbar>
					<LinkContainer to={ `/logs/${ this.props.currentUser.username }/new` }>
						<Button bsStyle="primary">Create New</Button>
					</LinkContainer>

					<ButtonGroup>
						<Button onClick={ LogEntryActions.selectAllEntries }>Select All</Button>
						<Button onClick={ LogEntryActions.selectNoEntries }>Select None</Button>
					</ButtonGroup>

					<Button onClick={ this.handleBulkDelete }><Glyphicon glyph="trash" /></Button>

					<ToggleButtonGroup
						name="sortBy"
						value={ this.props.sortBy }
						onChange={ this.handleSortByChanged }
					>
						<ToggleButton id="sortBy_entryTime" value="entryTime">
							By Date
						</ToggleButton>
						<ToggleButton id="sortBy_maxDepth" value="maxDepth">
							By Depth
						</ToggleButton>
						<ToggleButton id="sortBy_bottomTime" value="bottomTime">
							By Duration
						</ToggleButton>
					</ToggleButtonGroup>

					<ToggleButtonGroup
						type="checkbox"
						value={ this.props.sortOrder === 'asc' ? [ 'asc' ] : [] }
						onChange={ this.handleSortOrderChanged }
					>
						<ToggleButton id="sortOrder" value="asc">
							{ reverseOrderText }
						</ToggleButton>
					</ToggleButtonGroup>
				</ButtonToolbar>

				<div id="logs-list">
					{
						this.props.listEntries && this.props.listEntries.length > 0
							? <p>Showing <Label>{ this.props.listEntries.length }</Label>{ ' entries.' }</p>
							: null
					}
					<LogsListGrid
						depthUnit={ this.props.currentUser.distanceUnit }
						isSearching={ this.props.isSearching }
						listEntries={ this.props.listEntries }
						username={ this.state.username }
					/>
					<Clearfix />
				</div>
			</div>);
	}
}

LogsList.propTypes = {
	currentUser: PropTypes.object.isRequired,
	listEntries: PropTypes.array,
	history: PropTypes.object.isRequired,
	isSearching: PropTypes.bool.isRequired,
	match: PropTypes.object.isRequired,
	sortBy: PropTypes.string.isRequired,
	sortOrder: PropTypes.string.isRequired
};

export default withRouter(connectToStores(LogsList));
