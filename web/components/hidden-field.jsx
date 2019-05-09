import React from 'react';
import { propTypes, withFormsy } from 'formsy-react';

class HiddenField extends React.Component {
	render() {
		return (
			<input
				type="hidden"
				id={ this.props.controlId }
				name={ this.props.name }
				value={ this.props.getValue() }
			/>
		);
	}
}

HiddenField.propTypes = {
	...propTypes
};

export default withFormsy(HiddenField);
