import PropTypes from 'prop-types';
import React from 'react';
import LoadingSpinner from '../../components/loading-spinner';
import LogsListItem from './logs-list-item';

import {
	Alert,
	Col,
	ListGroup
} from 'react-bootstrap';

class LogsListGrid extends React.Component {
	render() {
		if (this.props.isSearching) {
			return <LoadingSpinner message="Retrieving log records..." />;
		}

		if (!this.props.listEntries || this.props.listEntries.length === 0) {
			return (
				<Alert id="no-entries-message" bsStyle="info">
					<p>
						You have no logs to show. Click <strong>Create New</strong> above to add logs entries.
					</p>
				</Alert>
			);
		}

		const { listEntries } = this.props;
		const elements = listEntries.map((entry, i) => (
			<Col key={ `entry_${ i }` } sm={ 12 } md={ 6 } lg={ 4 }>
				<LogsListItem
					depthUnit={ this.props.depthUnit }
					index={ i }
					username={ this.props.username }
					entry={ entry }
				/>
			</Col>
		));

		return (
			<ListGroup id="log-entries-grid">
				{ elements }
			</ListGroup>
		);
	}
}

LogsListGrid.propTypes = {
	depthUnit: PropTypes.string.isRequired,
	listEntries: PropTypes.array,
	isSearching: PropTypes.bool.isRequired,
	username: PropTypes.string.isRequired
};

export default LogsListGrid;
