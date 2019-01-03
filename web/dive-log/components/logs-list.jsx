import _ from 'lodash';
import connectToStores from 'alt-utils/lib/connectToStores';
import CurrentUserStore from '../../users/stores/current-user-store';
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

const records = [
	{
		entryId: 'abcd1234',
		entryTime: moment().utc().toISOString()
	}
];

const DateFormat = 'MMMM Do YYYY - h:mma';

class LogsList extends React.Component {
	static getStores() {
		return [ CurrentUserStore ];
	}

	static getPropsFromStores() {
		return CurrentUserStore.getState();
	}

	renderDiveList() {
		return _.map(records, r => (
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
	currentUser: PropTypes.object.isRequired
};

export default connectToStores(LogsList);
