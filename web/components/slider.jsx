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

	render() {
		const {
			controlId,
			getValue,
			highEndCaption,
			isPristine,
			label,
			lowEndCaption,
			max,
			min
		} = this.props;
		const validationState = isPristine() ? null : 'success';

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
					value={ getValue() || '' }
				/>
			</FormGroup>
		);
	}
}

Slider.propTypes = {
	...formsyProps,
	highEndCaption: PropTypes.string,
	lowEndCaption: PropTypes.string,
	max: PropTypes.number,
	min: PropTypes.number
};

export default withFormsy(Slider);
