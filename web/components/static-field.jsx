import { FormControl } from 'react-bootstrap';
import FormGroup from './form-group';
import PropTypes from 'prop-types';
import { propTypes, withFormsy } from 'formsy-react';
import React from 'react';

class StaticField extends React.Component {
	render() {
		return (
			<FormGroup label={ this.props.label } controlId={ this.props.controlId }>
				<FormControl.Static>
					{ this.props.getValue() || <em>{ this.props.default }</em> || '' }
				</FormControl.Static>
			</FormGroup>
		);
	}
}

StaticField.propTypes = {
	controlId: PropTypes.string.isRequired,
	default: PropTypes.string,
	label: PropTypes.string.isRequired,
	...propTypes
};

export default withFormsy(StaticField);
