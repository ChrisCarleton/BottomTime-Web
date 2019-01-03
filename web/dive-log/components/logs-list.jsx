import _ from 'lodash';
import CurrentUserStore from '../../users/stores/current-user-store';
import moment from 'moment';
import React from 'react';
import RequireUser from '../../components/require-user';

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
		entryTime: moment().utc().toISOString(),
	}
];

const DateFormat = 'MMMM Do YYYY - h:mma';

class LogsList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			...CurrentUserStore.getState()
		};
		this.handleUserStoreChanged = this.handleUserStoreChanged.bind(this);
	}

	componentDidMount() {
		CurrentUserStore.listen(this.handleUserStoreChanged);
	}

	componentWillUnmount() {
		CurrentUserStore.unlisten(this.handleUserStoreChanged);
	}

	handleUserStoreChanged() {
		this.setState({
			...this.state,
			...CurrentUserStore.getState()
		});
	}

	renderDiveList() {
		return _.map(records, r => (
			<Media key={ r.entryId }>
				<Media.Left>
					<img src="/img/diver-icon.png" />
				</Media.Left>
				<Media.Body>
					<LinkContainer to={ `/logs/${ this.state.currentUser.username }/${ r.entryId }` }>
						<Media.Heading>{ moment(r.entryTime).local().format(DateFormat) }</Media.Heading>
					</LinkContainer>
				</Media.Body>
			</Media>
		));
	}

	render() {
		if (!this.state.currentUser || this.state.currentUser.isAnonymous) {
			return <RequireUser />;
		}

		return (
			<div>
				<Breadcrumb>
					<LinkContainer to="/">
						<Breadcrumb.Item>Home</Breadcrumb.Item>
					</LinkContainer>
					<Breadcrumb.Item active>My Logs</Breadcrumb.Item>
				</Breadcrumb>

				<h1>Logs List!</h1>

				<LinkContainer to={ `/logs/${ this.state.currentUser.username }/new` }>
					<Button bsStyle="primary">Create New</Button>
				</LinkContainer>

				{ this.renderDiveList() }
			</div>);
	}
}

export default LogsList;
