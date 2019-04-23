import FormGroup from './form-group';
import PropTypes from 'prop-types';
import React from 'react';
import { propTypes, withFormsy } from 'formsy-react';

import { FormControl, InputGroup } from 'react-bootstrap';

class TextBox extends React.Component {
	constructor(props) {
		super(props);
		this.handleTextChanged = this.handleTextChanged.bind(this);
	}

	handleTextChanged(e) {
		this.props.setValue(e.target.value);
		if (this.props.onChange) {
			this.props.onChange(e.target.value);
		}
	}

	render() {
		let errorMessage = null;
		let validationState = null;

		if (!this.props.isPristine() && this.props.showRequired()) {

			errorMessage = `${ this.props.label } is required.`;
			validationState = 'error';

		} else if (this.props.showError()) {

			errorMessage = this.props.getErrorMessage();
			validationState = 'error';

		} else if (this.props.isPristine()) {

			errorMessage = null;
			validationState = null;

		} else {

			errorMessage = null;
			validationState = 'success';

		}

		const formControl = (
			<FormControl
				autoFocus={ this.props.autoFocus }
				type={ this.props.password ? 'password' : 'text' }
				value={ this.props.getValue() || '' }
				onChange={ this.handleTextChanged }
				maxLength={ this.props.maxLength }
				placeholder={ this.props.placeholder }
			/>
		);

		return (
			<FormGroup
				label={ this.props.label }
				controlId={ this.props.controlId }
				errorMessage={ errorMessage }
				validationState={ validationState }
				smallLabel={ this.props.smallLabel }
				required={ this.props.required }
			>
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
	autoFocus: PropTypes.bool,
	controlId: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	maxLength: PropTypes.number,
	onChange: PropTypes.func,
	password: PropTypes.bool,
	placeholder: PropTypes.string,
	required: PropTypes.bool,
	smallLabel: PropTypes.bool,
	units: PropTypes.string,
	...propTypes
};

export default withFormsy(TextBox);
