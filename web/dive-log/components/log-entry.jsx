import agent from '../../agent';
import { Breadcrumb } from 'react-bootstrap';
import connectToStores from 'alt-utils/lib/connectToStores';
import CurrentLogEntryActions from '../actions/current-log-entry-actions';
import CurrentLogEntryStore from '../stores/current-log-entry-store';
import CurrentUserStore from '../../users/stores/current-user-store';
import EditLogEntry from './edit-log-entry';
import handleError from '../../handle-error';
import { LinkContainer } from 'react-router-bootstrap';
import LoadingSpinner from '../../components/loading-spinner';
import PageTitle from '../../components/page-title';
import PropTypes from 'prop-types';
import React from 'react';
import RequireUser from '../../components/require-user';
import ViewLogEntry from './view-log-entry';
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

	componentDidMount() {
		setTimeout(async () => {
			const { params } = this.props.match;
			CurrentLogEntryActions.beginLoading();

			if (params.logId) {
				try {
					const response = await agent
						.get(`/api/users/${ params.username }/logs/${ params.logId }`);
					CurrentLogEntryActions.setCurrentEntry(response.body);
				} catch (err) {
					CurrentLogEntryActions.finishLoading();
					handleError(err, this.props.history);
				}
			} else {
				CurrentLogEntryActions.setCurrentEntry({});
			}
		}, 0);
	}

	render() {
		const logsListPage = `/logs/${ this.props.match.params.username || '' }`;
		const pageTitle = this.props.match.params.logId ? 'View/Edit Log Entry' : 'Create Log Entry';
		let pageContent = null;

		if (
			this.props.currentUser.isAnonymous && (
				!this.props.match.params.username
				|| !this.props.match.params.logId
			)
		) {
			return <RequireUser />;
		}

		if (this.props.isLoading) {
			pageContent = <LoadingSpinner message="Loading Log Entry..." />;
		} else if (this.props.currentEntry.isReadOnly) {
			pageContent = (
				<ViewLogEntry
					currentEntry={ this.props.currentEntry }
				/>
			);
		} else {
			pageContent = (
				<EditLogEntry
					currentUser={ this.props.currentUser }
					currentEntry={ this.props.currentEntry }
				/>
			);
		}

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
				{ pageContent }
			</div>
		);
	}
}

LogEntry.propTypes = {
	currentEntry: PropTypes.object.isRequired,
	currentUser: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	isLoading: PropTypes.bool.isRequired,
	match: PropTypes.object.isRequired
};

export default connectToStores(withRouter(LogEntry));
