import _ from 'lodash';
import connectToStores from 'alt-utils/lib/connectToStores';
import CurrentUserStore from '../../users/stores/current-user-store';
import LogEntryActions from '../actions/log-entry-actions';
import LogEntryStore from '../stores/log-entry-store';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';

import { LinkContainer } from 'react-router-bootstrap';
import {
	Alert,
	Breadcrumb,
	Button,
	Image,
	Media
} from 'react-bootstrap';

require('../../img/diver-icon.png');

const DateFormat = 'MMMM Do YYYY - h:mma';

class LogsList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	static getStores() {
		return [ CurrentUserStore, LogEntryStore ];
	}

	static getPropsFromStores() {
		return {
			currentUser: CurrentUserStore.getState().currentUser,
			...LogEntryStore.getState()
		};
	}

	componentDidMount() {
		const username = this.props.match.params.username;
		if (username) {
			if (
				username.charAt(username.length - 1) === 's'
				|| username.charAt(username.length - 1) === 'S'
			) {
				this.setState({ ...this.state, possessive: `${ username }'` })
			} else {
				this.setState({ ...this.state, possessive: `${ username }'s` })
			}
		} else {
			this.setState({ ...this.state, possessive: 'My' });
		}

		LogEntryActions.searchLogs(username || this.props.currentUser.username);
	}

	renderDiveList() {
		if (this.props.isSearching) {
			return (
				<Media>
					<Media.Left align="middle">
						<Image src="/img/loading-spinner.gif" />
					</Media.Left>
					<Media.Body>
						<h4>Loading</h4>
						<p><em>Retrieving log records...</em></p>
					</Media.Body>
				</Media>
			);
		}

		if (!this.props.logsList || this.props.logsList.length === 0) {
			return (
				<Alert bsStyle="info">
					<p>
						You have no logs to show. Click <strong>Create New</strong> above to add logs entries.
					</p>
				</Alert>
			);
		}

		return _.map(this.props.logsList, r => (
			<Media key={ r.entryId }>
				<Media.Left>
					<img src="/img/diver-icon.png" />
				</Media.Left>
				<Media.Body>
					<LinkContainer to={ `/logs/${ this.props.currentUser.username }/${ r.entryId }` }>
						<Media.Heading>{ moment(r.entryTime).local().format(DateFormat) }</Media.Heading>
					</LinkContainer>
				</Media.Body>
			</Media>
		));
	}

	render() {
		return (
			<div>
				<Breadcrumb>
					<LinkContainer to="/">
						<Breadcrumb.Item>Home</Breadcrumb.Item>
					</LinkContainer>
					<Breadcrumb.Item active>Log Book</Breadcrumb.Item>
				</Breadcrumb>

				<h1>{ `${ this.state.possessive } Log Book` }</h1>

				<LinkContainer to={ `/logs/${ this.props.currentUser.username }/new` }>
					<Button bsStyle="primary">Create New</Button>
				</LinkContainer>

				<div id="logs-list">
					{ this.renderDiveList() }
				</div>
			</div>);
	}
}

LogsList.propTypes = {
	currentUser: PropTypes.object.isRequired,
	logsList: PropTypes.array,
	isSearching: PropTypes.bool,
	match: PropTypes.object.isRequired
};

export default withRouter(connectToStores(LogsList));
