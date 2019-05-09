import PropTypes from 'prop-types';
import React from 'react';

import {
	Col,
	ControlLabel,
	FormGroup
} from 'react-bootstrap';

class CustomFormGroup extends React.Component {
	render() {
		return (
			<FormGroup
				bsClass="form-group row"
				bsSize="small"
				controlId={ this.props.controlId }
				validationState={ this.props.validationState }
			>
				{
					this.props.label
						? (
							<Col xs={ 12 } sm={ 3 } md={ 3 } mdOffset={ 1 }>
								<div className="text-right" style={ { width: '100%' } }>
									<ControlLabel>
										{ this.props.label }
										{ this.props.required ? <span className="text-danger">*</span> : null }
										{ ':' }
									</ControlLabel>
								</div>
							</Col>)
						: null
				}
				<Col
					xs={ 12 }
					smOffset={ this.props.label ? 0 : 3 }
					sm={ 9 }
					mdOffset={ this.props.label ? 0 : 4 }
					md={ 8 }
				>
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
	label: PropTypes.string,
	required: PropTypes.bool,
	validationState: PropTypes.oneOf([ 'success', 'warning', 'error' ])
};

export default CustomFormGroup;
