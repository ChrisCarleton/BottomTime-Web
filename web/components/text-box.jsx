import PropTypes from 'prop-types';
import React from 'react';
import { propTypes, withFormsy } from 'formsy-react';

import { FormControl, InputGroup } from 'react-bootstrap';
import FormGroup from './form-group';

class TextBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: props.getValue() || '' };
		this.onTextChanged = this.onTextChanged.bind(this);
	}

	onTextChanged(e) {
		this.props.setValue(e.target.value);
		this.setState({ value: e.target.value });
		if (this.props.onChange) this.props.onChange(e.target.value);
	}

	render() {
		let errorMessage;
		let validationState;

		if (this.props.isPristine()) {
			errorMessage = null;
			validationState = null;
		}

		else if (this.props.showRequired()) {
			errorMessage = `${this.props.label} is required.`;
			validationState = 'error';
		}

		else if (this.props.showError()) {
			errorMessage = this.props.getErrorMessage();
			validationState = 'error';
		}

		else {
			errorMessage = null;
			validationState = 'success';
		}

		const formControl = <FormControl
			type="text"
			value={ this.state.value }
			onChange={ this.onTextChanged }
			required={ this.props.required } />;

		return (
			<FormGroup
			label={ this.props.label }
			controlId={ this.props.controlId }
			errorMessage={ errorMessage }
			validationState={ validationState }
			smallLabel={ this.props.smallLabel }
			required={ this.props.required }>
				{ this.props.units
					? <InputGroup>
							{ formControl }
							<InputGroup.Addon>{ this.props.units }</InputGroup.Addon>
						</InputGroup>
					: formControl }
				
			</FormGroup>);
	}
}

TextBox.propTypes = {
	controlId: PropTypes.string.isRequired,
	horizontal: PropTypes.bool,
	label: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	required: PropTypes.bool,
	smallLabel: PropTypes.bool,
	units: PropTypes.string,
	...propTypes
};

export default withFormsy(TextBox);
