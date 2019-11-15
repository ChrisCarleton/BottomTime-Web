import { Checkbox } from 'react-bootstrap';
import { propTypes as formsyProps, withFormsy } from 'formsy-react';
import PropTypes from 'prop-types';
import React from 'react';

class InlineCheckbox extends React.Component {
	constructor(props) {
		super(props);
		this.handleChanged = this.handleChanged.bind(this);
	}

	handleChanged(e) {
		this.props.setValue(e.target.checked);
	}

	render() {
		const {
			label,
			readOnly
		} = this.props;
		const value = this.props.getValue();

		return (
			<Checkbox
				checked={ typeof value === 'boolean' ? value : false }
				disabled={ readOnly }
				inline
				onChange={ this.handleChanged }
			>
				{ label }
			</Checkbox>
		);
	}
}

InlineCheckbox.propTypes = {
	readOnly: PropTypes.bool,
	...formsyProps
};

export default withFormsy(InlineCheckbox);
