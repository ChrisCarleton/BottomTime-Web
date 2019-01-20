import connectToStores from 'alt-utils/lib/connectToStores';
import CurrentUserStore from '../../users/stores/current-user-store';
import LogEntryActions from '../actions/log-entry-actions';
import LogEntryStore from '../stores/log-entry-store';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';

import { LinkContainer } from 'react-router-bootstrap';
import LogsListGrid from './logs-list-grid';
import {
	Breadcrumb,
	Button,
	ButtonToolbar,
	Label,
	ToggleButton,
	ToggleButtonGroup
} from 'react-bootstrap';

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

		const username = this.getUsernameForRoute();
		let possessive = null;
		if (username === props.currentUser.username) {
			possessive = 'My';
		} else if (
			username.charAt(username.length - 1) === 's'
			|| username.charAt(username.length - 1) === 'S'
		) {
			possessive = `${ username }'`;
		} else {
			possessive = `${ username }'s`;
		}

		this.state = { possessive };

		this.handleSortByChanged = this.handleSortByChanged.bind(this);
		this.handleSortOrderChanged = this.handleSortOrderChanged.bind(this);
	}

	componentDidMount() {
		this.searchLogs();
	}

	getUsernameForRoute() {
		return this.props.match.params.username || this.props.currentUser.username;
	}

	searchLogs(params) {
		const username = this.getUsernameForRoute();
		params = params || {
			sortBy: this.props.sortBy,
			sortOrder: this.props.sortOrder
		};
		LogEntryActions.searchLogs(
			username,
			params
		);
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

	render() {
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
				<Breadcrumb>
					<LinkContainer to="/">
						<Breadcrumb.Item>Home</Breadcrumb.Item>
					</LinkContainer>
					<Breadcrumb.Item active>Log Book</Breadcrumb.Item>
				</Breadcrumb>

				<h1>{ `${ this.state.possessive } Log Book` }</h1>

				<ButtonToolbar>
					<LinkContainer to={ `/logs/${ this.props.currentUser.username }/new` }>
						<Button bsStyle="primary">Create New</Button>
					</LinkContainer>

					<ToggleButtonGroup
						name="sortBy"
						value={ this.props.sortBy }
						onChange={ this.handleSortByChanged }
					>
						<ToggleButton value="entryTime">
							By Date
						</ToggleButton>
						<ToggleButton value="maxDepth">
							By Depth
						</ToggleButton>
						<ToggleButton value="bottomTime">
							By Duration
						</ToggleButton>
					</ToggleButtonGroup>

					<ToggleButtonGroup
						type="checkbox"
						value={ this.props.sortOrder === 'asc' ? [ 'asc' ] : [] }
						onChange={ this.handleSortOrderChanged }
					>
						<ToggleButton value="asc">
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
						isSearching={ this.props.isSearching }
						listEntries={ this.props.listEntries }
						username={ this.getUsernameForRoute() }
					/>
				</div>
			</div>);
	}
}

LogsList.propTypes = {
	currentUser: PropTypes.object.isRequired,
	listEntries: PropTypes.array,
	isSearching: PropTypes.bool,
	match: PropTypes.object.isRequired,
	sortBy: PropTypes.string.isRequired,
	sortOrder: PropTypes.string.isRequired
};

export default withRouter(connectToStores(LogsList));
