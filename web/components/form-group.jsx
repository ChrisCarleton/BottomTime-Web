import PropTypes from 'prop-types';
import React from 'react';

import {
	Col,
	ControlLabel,
	FormGroup
} from 'react-bootstrap';

class CustomFormGroup extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<FormGroup 
			bsClass="form-group row"
			controlId={ this.props.controlId }
			validationState={ this.props.validationState }>
				<ControlLabel bsClass="col-sm-3 col-form-label">{ this.props.label }</ControlLabel>
				<Col sm={ 9 }>
					{ this.props.children }
					{ this.props.errorMessage 
						? <p><small className="text-danger">{ this.props.errorMessage }</small></p>
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
	validationState: PropTypes.oneOf(['success', 'warning', 'error'])
};

export default CustomFormGroup;
