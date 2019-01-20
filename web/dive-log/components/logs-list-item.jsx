import { Link } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { Well } from 'react-bootstrap';

const DateFormat = 'MMMM Do YYYY - h:mma';

class LogsListItem extends React.Component {
	render() {
		return (
			<Well bsSize="sm">
				<h4>
					<Link to={ `/logs/${ this.props.username }/${ this.props.entry.entryId }` }>
						{ moment(this.props.entry.entryTime).local().format(DateFormat) }
					</Link>
				</h4>
				<dl className="dl-horizontal">
					<dt>Location:</dt>
					<dd>{ this.props.entry.location }</dd>

					<dt>Site:</dt>
					<dd>{ this.props.entry.site }</dd>

					<dt>Max depth:</dt>
					<dd>{ this.props.entry.maxDepth }ft</dd>

					<dt>Bottom time:</dt>
					<dd>{ this.props.entry.bottomTime }min</dd>
				</dl>
			</Well>
		);
	}
}

LogsListItem.propTypes = {
	entry: PropTypes.object.isRequired,
	username: PropTypes.string.isRequired
};

export default LogsListItem;
