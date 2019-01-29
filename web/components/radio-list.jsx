import _ from 'lodash';
import FormGroup from './form-group';
import { propTypes as formsyProps, withFormsy } from 'formsy-react';
import PropTypes from 'prop-types';
import { Radio } from 'react-bootstrap';
import React from 'react';

class RadioList extends React.Component {
	constructor(props) {
		super(props);

		this.handleChecked = this.handleChecked.bind(this);
	}

	handleChecked(e) {
		this.props.setValue(e.currentTarget.value);

		if (this.props.onChange) {
			this.props.onChange(e.currentTarget.value);
		}
	}

	render() {
		const value = this.props.getValue();
		let errorMessage = null;
		let validationState = null;

		if (!this.props.isPristine() && this.props.showRequired()) {

			errorMessage = `${ this.props.label } is required.`;
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
				validationState={ validationState }
				errorMessage={ errorMessage }
			>
				{ _.map(
					this.props.children,
					c => <Radio
							key={ c.value }
							name={ this.props.name }
							inline={ this.props.inline }
							value={ c.value }
							checked={ value === c.value }
							onChange={ this.handleChecked }
							title={ c.title }
						>
							{ c.text || c.value }
						</Radio>
				) }
			</FormGroup>
		);
	}
}

Option.propTypes = {
	text: PropTypes.string,
	value: PropTypes.string.isRequired
};

RadioList.propTypes = {
	children: PropTypes.array.isRequired,
	controlId: PropTypes.string.isRequired,
	inline: PropTypes.bool,
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	...formsyProps
};

export default withFormsy(RadioList);
