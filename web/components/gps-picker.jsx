import PropTypes from 'prop-types';
import React from 'react';

import { ControlLabel } from 'react-bootstrap';
import TextBox from './text-box';

class GpsPicker extends React.Component {
	render() {
		return (
			<div>
				<ControlLabel>{ this.props.label }</ControlLabel>
				<TextBox
					controlId={ `${this.props.controlId}-lat` }
					name={ `${this.props.controlId}-lat` }
					label="Latitude"
					required={ this.props.required }
					smallLabel />
				<TextBox
					controlId={ `${this.props.controlId}-lon` }
					name={ `${this.props.controlId}-lon` }
					label="Longitude"
					required={ this.props.required }
					smallLabel />
				<iframe
				width="100%"
				height="300px"
				frameBorder="0"
				style={{ border: 0 }}
				src="https://www.google.com/maps/embed/v1/view?zoom=13&center=43.4315%2C-80.3102&key=AIzaSyCw9yi0miRIFGZqGWHLr7OQvG2K_nj37fw">
				</iframe>
			</div>);
	}
}

GpsPicker.propTypes = {
	controlId: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	required: PropTypes.bool
};

export default GpsPicker;
