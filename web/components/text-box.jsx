import PropTypes from 'prop-types';
import React from 'react';

import { FormControl } from 'react-bootstrap';
import FormGroup from './form-group';

class TextBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = { value: props.value || '' };
		this.onTextChanged = this.onTextChanged.bind(this);
	}

	onTextChanged(e) {
		this.setState({ value: e.target.value });
		if (this.props.onChange) this.props.onChange(e.target.value);
	}

	render() {
		return (
			<FormGroup label={ this.props.label } controlId={ this.props.controlId }>
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
	horizontal: PropTypes.bool,
	label: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	required: PropTypes.bool,
	value: PropTypes.string
};

export default TextBox;
