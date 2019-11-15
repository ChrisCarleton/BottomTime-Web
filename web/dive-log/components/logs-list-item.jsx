import {
	Checkbox,
	Glyphicon,
	ListGroupItem
} from 'react-bootstrap';
import config from '../../config';
import { Link } from 'react-router-dom';
import LogEntryActions from '../actions/log-entry-actions';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { ToPreferredUnits } from '../../unit-conversion';

class LogsListItem extends React.Component {
	renderDepth(value, unit) {
		return `${ ToPreferredUnits.Distance[unit](value).toFixed(2) }${ unit }`;
	}

	render() {
		const { depthUnit, entry, index, username } = this.props;

		return (
			<ListGroupItem>
				<Link to={ `/logs/${ username }/${ entry.entryId }` }>
					<h4>{ moment(entry.entryTime).local().format(config.entryTimeFormat) }</h4>
				</Link>
				<Checkbox
					onChange={ () => LogEntryActions.toggleCheckedEntry(index) }
					checked={ entry.checked || false }
				>
					<span title="Location">
						<Glyphicon glyph="map-marker" />&nbsp;{ entry.location }, { entry.site }
					</span>
					{ ' | ' }
					<span title="Max depth">
						<Glyphicon glyph="dashboard" />&nbsp;{ this.renderDepth(entry.maxDepth, depthUnit) }
					</span>
					{ ' | ' }
					<span title="Bottom time">
						<Glyphicon glyph="time" />&nbsp;{ entry.bottomTime }min
					</span>
				</Checkbox>
			</ListGroupItem>
		);
	}
}

LogsListItem.propTypes = {
	depthUnit: PropTypes.string.isRequired,
	entry: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
	username: PropTypes.string.isRequired
};

export default LogsListItem;
