import PropTypes from 'prop-types';
import React from 'react';

import {
	ControlLabel,
	FormControl,
	FormGroup
} from 'react-bootstrap';

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

	renderVertical() {
		return (
			<FormGroup controlId={ this.props.controlId }>
				<ControlLabel>{ this.props.label }</ControlLabel>
				<FormControl
					type="text"
					value={ this.state.value }
					onChange={ this.onTextChanged } />
			</FormGroup>);
	}

	renderHorizontal() {
		return null;
	}

	render() {
		return this.props.horizontal
			? this.renderHorizontal()
			: this.renderVertical();
	}
}

TextBox.propTypes = {
	controlId: PropTypes.string.isRequired,
	horizontal: PropTypes.bool,
	label: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	value: PropTypes.string
};

export default TextBox;
