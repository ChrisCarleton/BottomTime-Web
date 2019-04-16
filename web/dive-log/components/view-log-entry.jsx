import React from 'react';
import PropTypes from 'prop-types';

class ViewLogEntry extends React.Component {
	render() {
		return (
			<div>
				{ JSON.stringify(this.props.currentEntry) }
			</div>
		);
	}
}

ViewLogEntry.propTypes = {
	currentEntry: PropTypes.object.isRequired
};

export default ViewLogEntry;
