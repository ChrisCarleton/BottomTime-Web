import PropTypes from 'prop-types';
import React from 'react';
import { withFormsy } from 'formsy-react';

import { FormControl } from 'react-bootstrap';
import FormGroup from './form-group';

class TextBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: props.value || '' };
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

		return (
			<FormGroup
			label={ this.props.label }
			controlId={ this.props.controlId }
			errorMessage={ errorMessage }
			validationState={ validationState }>
				<FormControl
					type="text"
					value={ this.state.value }
					onChange={ this.onTextChanged }
					required={ this.props.required } />
			</FormGroup>);
	}
}

TextBox.propTypes = {
	controlId: PropTypes.string.isRequired,
	getErrorMessage: PropTypes.func.isRequired,
	horizontal: PropTypes.bool,
	label: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	required: PropTypes.bool,
	setValue: PropTypes.func.isRequired,
	showError: PropTypes.func.isRequired,
	showRequired: PropTypes.func.isRequired,
	value: PropTypes.string
};

export default withFormsy(TextBox);
