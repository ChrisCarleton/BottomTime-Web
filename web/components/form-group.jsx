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
			<FormGroup bsClass="form-group row" controlId={ this.props.controlId }>
				<ControlLabel bsClass="col-sm-3 col-form-label">{ this.props.label }</ControlLabel>
				<Col sm={ 9 }>
					{ this.props.children }
				</Col>
			</FormGroup>);
	}
}

CustomFormGroup.propTypes = {
	children: PropTypes.node,
	controlId: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired
};

export default CustomFormGroup;
