import { FormControl } from 'react-bootstrap';
import FormGroup from './form-group';
import { propTypes as formsyProps, withFormsy } from 'formsy-react';
import PropTypes from 'prop-types';
import React from 'react';

class TextArea extends React.Component {
	constructor(props) {
		super(props);
		this.handleChanged = this.handleChanged.bind(this);
	}
	
	handleChanged(e) {
		this.props.setValue(e.currentTarget.value);

		if (this.props.onChange) {
			this.props.onChange(e.currentTarget.value);
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

		return (
			<FormGroup
				label={ this.props.label }
				controlId={ this.props.controlId }
				required={ this.props.required }
				errorMessage={ errorMessage }
				validationState={ validationState }
			>
				<FormControl
					componentClass="textarea"
					placeholder={ this.props.placeholder }
					maxLength={ this.props.maxLength }
					onChange={ this.handleChanged }
					value={ this.props.getValue() }
				/>
			</FormGroup>
		);
	}
}

TextArea.propTypes = {
	controlId: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	maxLength: PropTypes.number,
	onChange: PropTypes.func,
	placeholder: PropTypes.string,
	...formsyProps
};

export default withFormsy(TextArea);
