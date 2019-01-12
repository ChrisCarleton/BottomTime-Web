import _ from 'lodash';
import connectToStores from 'alt-utils/lib/connectToStores';
import CurrentUserStore from '../../users/stores/current-user-store';
import LogEntryStore from '../stores/log-entry-store';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

import { LinkContainer } from 'react-router-bootstrap';
import {
	Breadcrumb,
	Button,
	Media
} from 'react-bootstrap';

require('../../img/diver-icon.png');

const DateFormat = 'MMMM Do YYYY - h:mma';

class LogsList extends React.Component {
	static getStores() {
		return [ CurrentUserStore, LogEntryStore ];
	}

	static getPropsFromStores() {
		return {
			currentUser: CurrentUserStore.getState().currentUser,
			logsList: LogEntryStore.getState().logsList
		};
	}

	renderDiveList() {
		if (this.props.logsList.length === 0) {
			return <span><em>Nothing</em></span>;
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
					<Breadcrumb.Item active>My Logs</Breadcrumb.Item>
				</Breadcrumb>

				<h1>Logs List!</h1>

				<LinkContainer to={ `/logs/${ this.props.currentUser.username }/new` }>
					<Button bsStyle="primary">Create New</Button>
				</LinkContainer>

				{ this.renderDiveList() }
			</div>);
	}
}

LogsList.propTypes = {
	currentUser: PropTypes.object.isRequired,
	logsList: PropTypes.array.isRequired
};

export default connectToStores(LogsList);
