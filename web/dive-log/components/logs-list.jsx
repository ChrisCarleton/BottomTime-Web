import _ from 'lodash';
import connectToStores from 'alt-utils/lib/connectToStores';
import CurrentUserStore from '../../users/stores/current-user-store';
import LogEntryActions from '../actions/log-entry-actions';
import LogEntryStore from '../stores/log-entry-store';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import { LinkContainer } from 'react-router-bootstrap';
import {
	Alert,
	Breadcrumb,
	Button,
	Clearfix,
	Col,
	Grid,
	Image,
	Label,
	Media,
	Row,
	Well
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

	getUsernameForRoute() {
		return this.props.match.params.username || this.props.currentUser.username;
	}

	componentDidMount() {
		const username = this.getUsernameForRoute();
		let possessive = null;
		if (username === this.props.currentUser.username) {
			possessive = 'My';
		} else {
			if (
				username.charAt(username.length - 1) === 's'
				|| username.charAt(username.length - 1) === 'S'
			) {
				possessive = `${ username }'`;
			} else {
				possessive = `${ username }'s`;
			}
		}

		this.setState({ ...this.state, possessive });
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

		if (!this.props.listEntries || this.props.listEntries.length === 0) {
			return (
				<Alert bsStyle="info">
					<p>
						You have no logs to show. Click <strong>Create New</strong> above to add logs entries.
					</p>
				</Alert>
			);
		}

		const elements = [];
		const usernameForRoute = this.getUsernameForRoute();
		for (let i = 0; i < this.props.listEntries.length; i++) {
			const entry = this.props.listEntries[i];
			elements.push(
				<Clearfix 
					key={ `clfx_${ entry.entryId }` }
					visibleSmBlock
					visibleMdBlock={ i % 2 === 0 }
					visibleLgBlock={ i % 3 === 0 }
				/>
			);
			elements.push(
				<Col key={ entry.entryId } sm={ 12 } md={ 6 } lg={ 4 }>
					<Well bsSize="sm">
						<h4>
							<Link to={ `/logs/${ usernameForRoute }/${ entry.entryId }` }>
								{ moment(entry.entryTime).local().format(DateFormat) }
							</Link>
						</h4>
						<dl className="dl-horizontal">
							<dt>Location:</dt>
							<dd>{ entry.location }</dd>

							<dt>Site:</dt>
							<dd>{ entry.site }</dd>

							<dt>Max depth:</dt>
							<dd>{ entry.maxDepth }ft</dd>

							<dt>Bottom time:</dt>
							<dd>{ entry.bottomTime }min</dd>
						</dl>
					</Well>
				</Col>
			);
		}

		return (
			<Grid>
				<Row>{ elements }</Row>
			</Grid>
		);
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
					{
						this.props.listEntries && this.props.listEntries.length > 0
							? <p>Showing <Label>{ this.props.listEntries.length }</Label>{ ' entries.'}</p>
							: null
					}
					{ this.renderDiveList() }
				</div>
			</div>);
	}
}

LogsList.propTypes = {
	currentUser: PropTypes.object.isRequired,
	listEntries: PropTypes.array,
	isSearching: PropTypes.bool,
	match: PropTypes.object.isRequired
};

export default withRouter(connectToStores(LogsList));
