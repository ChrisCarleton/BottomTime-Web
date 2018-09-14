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
			value: moment(this.props.value)
		};

		this.onValueChanged = this.onValueChanged.bind(this);
	}

	onValueChanged(v) {
		this.setState({ value: v });
		if (this.props.onChange) this.props.onChange(v.format(`${DATE_FORMAT} ${TIME_FORMAT}`));
	}

	render() {
		return (
			<FormGroup controlId={ this.props.controlId } label={ this.props.label }>
				<DateTime
					value={ this.state.value }
					dateFormat={ DATE_FORMAT }
					timeFormat={ TIME_FORMAT }
					inputProps={{
						placeholder: 'dd/mm/yyyy hh:ss(AM/PM)',
						required: this.props.required
					}}
					onChange={ this.onValueChanged } />
			</FormGroup>);
	}
}

DatePicker.propTypes = {
	controlId: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	required: PropTypes.bool,
	value: PropTypes.string
};

export default DatePicker;
