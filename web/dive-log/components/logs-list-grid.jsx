import PropTypes from 'prop-types';
import React from 'react';
import LogsListItem from './logs-list-item';

import {
	Alert,
	Clearfix,
	Col,
	Grid,
	Image,
	Media,
	Row
} from 'react-bootstrap';

class LogsListGrid extends React.Component {
	render() {
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

		if (this.props.listEntries.length === 0) {
			return (
				<Alert bsStyle="info">
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
			<Grid>
				<Row>{ elements }</Row>
			</Grid>
		);
	}
}

LogsListGrid.propTypes = {
	listEntries: PropTypes.array.isRequired,
	isSearching: PropTypes.bool.isRequired,
	username: PropTypes.string.isRequired
};

export default LogsListGrid;
