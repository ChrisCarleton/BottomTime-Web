import PropTypes from 'prop-types';
import React from 'react';

import {
	ControlLabel,
	FormGroup
} from 'react-bootstrap';

class CustomFormGroup extends React.Component {
	render() {
		return (
			<FormGroup
				bsSize="small"
				controlId={ this.props.controlId }
				validationState={ this.props.validationState }
			>
				{
					this.props.label
						? (
							<ControlLabel>
								{ this.props.label }
								{ this.props.required ? <span className="text-danger">*</span> : null }
								{ ':' }
							</ControlLabel>
						)
						: null
				}
				{ this.props.children }
				{ this.props.errorMessage
					? <p id={ `err-${ this.props.controlId }` } className="text-danger">
						{ this.props.errorMessage }
					</p>
					: null }
			</FormGroup>);
	}
}

CustomFormGroup.propTypes = {
	children: PropTypes.node,
	controlId: PropTypes.string.isRequired,
	errorMessage: PropTypes.string,
	label: PropTypes.string,
	required: PropTypes.bool,
	validationState: PropTypes.oneOf([ 'success', 'warning', 'error' ])
};

export default CustomFormGroup;
