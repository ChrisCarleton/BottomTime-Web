import { Checkbox } from 'react-bootstrap';
import FormGroup from './form-group';
import { propTypes as formsyProps, withFormsy } from 'formsy-react';
import PropTypes from 'prop-types';
import React from 'react';

class FormCheckBox extends React.Component {
	constructor(props) {
		super(props);
		this.onCheckChanged = this.onCheckChanged.bind(this);
	}

	onCheckChanged(e) {
		this.props.setValue(e.target.checked);
	}

	render() {
		const {
			controlId,
			label,
			name,
			readOnly
		} = this.props;
		const value = this.props.getValue();

		const validationState = this.props.isPristine()
			? null
			: 'success';

		return (
			<FormGroup
				controlId={ controlId }
				label={ label }
				name={ name }
				validationState={ validationState }
			>
				<Checkbox
					checked={ typeof value === 'boolean' ? value : false }
					readOnly={ readOnly }
					onChange={ this.onCheckChanged }
				/>
			</FormGroup>
		);
	}
}

FormCheckBox.propTypes = {
	...formsyProps,
	controlId: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	readOnly: PropTypes.bool
};

export default withFormsy(FormCheckBox);
