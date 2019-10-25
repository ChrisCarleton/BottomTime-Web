import FormGroup from './form-group';
import { FormControl } from 'react-bootstrap';
import { propTypes as formsyProps, withFormsy } from 'formsy-react';
import PropTypes from 'prop-types';
import React from 'react';

class SelectBox extends React.Component {
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

		if (this.props.isPristine()) {

			errorMessage = null;
			validationState = null;

		} else if (this.props.showRequired()) {

			errorMessage = `${ this.props.label } is required.`;
			validationState = 'error';

		} else {

			errorMessage = null;
			validationState = 'success';

		}

		return (
			<FormGroup
				controlId={ this.props.controlId }
				label={ this.props.label }
				errorMessage={ errorMessage }
				validationState={ validationState }
				required={ this.props.required }
				small={ this.props.small }
			>
				<FormControl
					componentClass="select"
					value={ this.props.getValue() }
					onChange={ this.handleChanged }
					placeholder={ this.props.placeholder }
				>
					{ this.props.children }
				</FormControl>
			</FormGroup>
		);
	}
}

SelectBox.propTypes = {
	children: PropTypes.node.isRequired,
	controlId: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	placeholder: PropTypes.string,
	small: PropTypes.bool,
	...formsyProps
};

export default withFormsy(SelectBox);
