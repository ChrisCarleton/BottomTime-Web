import { propTypes, withFormsy } from 'formsy-react';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

import DateTime from 'react-datetime';
import FormGroup from './form-group';

require('./date-picker.css');

const DATE_FORMAT = 'DD/MM/YYYY';
const TIME_FORMAT = 'hh:mmA';

class DatePicker extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: moment(this.props.getValue())
		};

		this.handleValueChanged = this.handleValueChanged.bind(this);
	}

	handleValueChanged(v) {
		this.setState({ value: v });

		if (this.props.onChange) {
			this.props.onChange(v);
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

		} else if (this.props.showError()) {

			errorMessage = this.props.getErrorMessage();
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
			>
				<DateTime
					value={ this.state.value }
					dateFormat={ DATE_FORMAT }
					timeFormat={ TIME_FORMAT }
					inputProps={ {
						placeholder: 'dd/mm/yyyy hh:ss(AM/PM)',
						required: this.props.required
					} }
					onChange={ this.handleValueChanged }
				/>
			</FormGroup>);
	}
}

DatePicker.propTypes = {
	controlId: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	required: PropTypes.bool,
	// value: PropTypes.string,
	...propTypes
};

export default withFormsy(DatePicker);
