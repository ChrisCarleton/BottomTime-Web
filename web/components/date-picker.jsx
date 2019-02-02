import { propTypes, withFormsy } from 'formsy-react';
import PropTypes from 'prop-types';
import React from 'react';

import DateTime from 'react-datetime';
import FormGroup from './form-group';

require('./date-picker.css');

const DATE_FORMAT = 'YYYY-MM-DD';
const TIME_FORMAT = 'hh:mmA';

class DatePicker extends React.Component {
	constructor(props) {
		super(props);
		this.handleValueChanged = this.handleValueChanged.bind(this);
		this.getPlaceholder = this.getPlaceholder.bind(this);
	}

	handleValueChanged(v) {
		this.props.setValue(v);

		if (this.props.onChange) {
			this.props.onChange(v);
		}
	}

	getPlaceholder() {
		let placeholder = '';
		if (!this.props.hideDate) {
			placeholder += `${ this.props.dateFormat || DATE_FORMAT } `;
		}

		if (!this.props.hideTime) {
			placeholder += this.props.timeFormat || TIME_FORMAT;
		}

		return placeholder;
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
					value={ this.props.getValue() }
					dateFormat={ this.props.hideDate ? null : this.props.dateFormat || DATE_FORMAT }
					timeFormat={ this.props.hideTime ? null : this.props.timeFormat || TIME_FORMAT }
					defaultValue={ this.props.defaultValue }
					viewDate={ this.props.viewDate }
					viewMode={ this.props.viewMode }
					inputProps={ {
						id: this.props.controlId,
						required: this.props.required,
						placeholder: this.getPlaceholder()
					} }
					timeConstraints={ this.props.timeConstraints }
					strictParsing={ false }
					onChange={ this.handleValueChanged }
				/>
			</FormGroup>);
	}
}

DatePicker.propTypes = {
	controlId: PropTypes.string.isRequired,
	dateFormat: PropTypes.string,
	defaultValue: PropTypes.string,
	label: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	required: PropTypes.bool,
	hideDate: PropTypes.bool,
	hideTime: PropTypes.bool,
	timeConstraints: PropTypes.object,
	timeFormat: PropTypes.string,
	viewDate: PropTypes.string,
	viewMode: PropTypes.string,
	...propTypes
};

export default withFormsy(DatePicker);
