import PropTypes from 'prop-types';
import React from 'react';
import LoadingSpinner from '../../components/loading-spinner';
import LogsListItem from './logs-list-item';

import {
	Alert,
	Clearfix,
	Col,
	Grid,
	Row
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

		const elements = [];
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
					<LogsListItem
						username={ this.props.username }
						entry={ entry }
					/>
				</Col>
			);
		}

		return (
			<Grid id="log-entries-grid">
				<Row>{ elements }</Row>
			</Grid>
		);
	}
}

LogsListGrid.propTypes = {
	listEntries: PropTypes.array,
	isSearching: PropTypes.bool.isRequired,
	username: PropTypes.string.isRequired
};

export default LogsListGrid;
