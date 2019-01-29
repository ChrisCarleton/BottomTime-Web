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
				<Col xs={ 12 } sm={ 3 } md={ 2 } mdOffset={ 1 }>
					<ControlLabel>
						{ label }{ this.props.required ? <span className="text-danger">*</span> : null }{ ':' }
					</ControlLabel>
				</Col>
				<Col xs={ 12 } sm={ 9 } md={ 6 }>
					{ this.props.children }
					{ this.props.errorMessage
						? <p id={ `err-${ this.props.controlId }` } className="text-danger">
							{ this.props.errorMessage }
						</p>
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
