import FormGroup from './/form-group';
import { propTypes as formsyProps, withFormsy } from 'formsy-react';
import PropTypes from 'prop-types';
import React from 'react';

class Slider extends React.Component {
	constructor(props) {
		super(props);
		this.handleSlide = this.handleSlide.bind(this);
	}

	handleSlide(e) {
		this.props.setValue(e.target.value);
	}

	renderValue(value) {
		switch (typeof value) {
		case 'undefined':
			return 'Unspecified';

		case 'number':
			return value.toFixed(1);

		case 'string':
			return parseFloat(value).toFixed(1);

		default:
			return value;
		}
	}

	render() {
		const valueTextStyle = { paddingTop: '4px', float: 'right' };
		const {
			controlId,
			getValue,
			highEndCaption,
			isPristine,
			label,
			lowEndCaption,
			max,
			min,
			step
		} = this.props;
		const validationState = isPristine() ? null : 'success';
		const value = getValue();

		return (
			<FormGroup
				controlId={ controlId }
				label={ label }
				validationState={ validationState }
			>
				<div className="slider-caption">
					<span>{ lowEndCaption }</span>
					<span className="slider-caption-right">{ highEndCaption }</span>
				</div>
				<input
					type="range"
					className="slider"
					onChange={ this.handleSlide }
					min={ min }
					max={ max }
					step={ step || 0.1 }
					value={ value || '' }
				/>
				<span style={ valueTextStyle }>
					<em>{ this.renderValue(value) }</em>
				</span>
			</FormGroup>
		);
	}
}

Slider.propTypes = {
	...formsyProps,
	highEndCaption: PropTypes.string,
	lowEndCaption: PropTypes.string,
	max: PropTypes.number,
	min: PropTypes.number,
	step: PropTypes.number
};

export default withFormsy(Slider);
