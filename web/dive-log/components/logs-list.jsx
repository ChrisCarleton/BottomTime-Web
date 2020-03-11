import {
	Breadcrumb,
	Button,
	ButtonToolbar,
	Label,
	ToggleButton,
	ToggleButtonGroup
} from 'react-bootstrap';
import connectToStores from 'alt-utils/lib/connectToStores';
import CurrentUserStore from '../../users/stores/current-user-store';
import Forbidden from '../../home/components/forbidden';
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

		this.state = { username, possessive };

		this.handleSortByChanged = this.handleSortByChanged.bind(this);
		this.handleSortOrderChanged = this.handleSortOrderChanged.bind(this);
	}

	componentDidMount() {
		this.searchLogs();
	}

	searchLogs(params) {
		const { username } = this.state;
		if (!username) {
			return;
		}

		params = params || {
			sortBy: this.props.sortBy,
			sortOrder: this.props.sortOrder
		};

		LogEntryActions.searchLogs(
			username,
			params,
			this.props.history
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
		const {
			currentUser,
			isForbidden,
			isSearching,
			listEntries,
			sortBy,
			sortOrder
		} = this.props;

		if (isForbidden && !currentUser.isAnonymous) {
			return <Forbidden />;
		}

		let reverseOrderText = null;
		switch (sortBy) {
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

				<PageTitle title={ `${ this.state.possessive } Log Book` } />
				<RequireUser customFunction={ () => currentUser.isAnonymous && !this.state.username }>
					<ButtonToolbar>
						<LinkContainer to={ `/logs/${ currentUser.username }/new` }>
							<Button bsStyle="primary">Create New</Button>
						</LinkContainer>

						<ToggleButtonGroup
							name="sortBy"
							value={ sortBy }
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
							value={ sortOrder === 'asc' ? [ 'asc' ] : [] }
							onChange={ this.handleSortOrderChanged }
						>
							<ToggleButton id="sortOrder" value="asc">
								{ reverseOrderText }
							</ToggleButton>
						</ToggleButtonGroup>
					</ButtonToolbar>

					<div id="logs-list">
						{
							listEntries && listEntries.length > 0
								? <p>Showing <Label>{ listEntries.length }</Label>{ ' entries.' }</p>
								: null
						}
						<LogsListGrid
							isSearching={ isSearching }
							listEntries={ listEntries }
							username={ this.state.username }
						/>
					</div>
				</RequireUser>
			</div>);
	}
}

LogsList.propTypes = {
	currentUser: PropTypes.object.isRequired,
	listEntries: PropTypes.array,
	history: PropTypes.object.isRequired,
	isForbidden: PropTypes.bool.isRequired,
	isSearching: PropTypes.bool.isRequired,
	match: PropTypes.object.isRequired,
	sortBy: PropTypes.string.isRequired,
	sortOrder: PropTypes.string.isRequired
};

export default withRouter(connectToStores(LogsList));
