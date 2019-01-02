import PropTypes from 'prop-types';
import React from 'react';

import {
	Col,
	ControlLabel,
	FormGroup
} from 'react-bootstrap';

class CustomFormGroup extends React.Component {
	render() {
		const label = this.props.smallLabel
			? <small><em>{ this.props.label }</em></small>
			: this.props.label;

		return (
			<FormGroup
				bsClass="form-group row"
				controlId={ this.props.controlId }
				validationState={ this.props.validationState }
			>
				<ControlLabel bsClass="col-sm-3 col-form-label text-right">
					{ label }{ this.props.required ? <span className="text-danger">*</span> : null }{ ':' }
				</ControlLabel>
				<Col sm={ 9 }>
					{ this.props.children }
					{ this.props.errorMessage
						? <p className="text-danger">{ this.props.errorMessage }</p>
						: null }
				</Col>
			</FormGroup>);
	}
}

CustomFormGroup.propTypes = {
	children: PropTypes.node,
	controlId: PropTypes.string.isRequired,
	errorMessage: PropTypes.string,
	label: PropTypes.string.isRequired,
	required: PropTypes.bool,
	smallLabel: PropTypes.bool,
	validationState: PropTypes.oneOf([ 'success', 'warning', 'error' ])
};

export default CustomFormGroup;
