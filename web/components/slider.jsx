import FormGroup from './/form-group';
import { HelpBlock } from 'react-bootstrap';
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
			captions,
			highEndCaption,
			isPristine,
			label,
			lowEndCaption,
			max,
			min
		} = this.props;
		const validationState = isPristine() ? null : 'success';

		const currentValue = getValue();
		let caption = null;

		if (captions && currentValue) {
			for (let i = 0; i < captions.length; i++) {
				if (captions[i].threshold <= currentValue) {
					/* eslint-disable prefer-destructuring */
					caption = captions[i].caption;
					/* eslint-enable prefer-destructuring */
				} else {
					break;
				}
			}
		}

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
					value={ currentValue || '' }
				/>
				<HelpBlock>{ caption }</HelpBlock>
			</FormGroup>
		);
	}
}

Slider.propTypes = {
	...formsyProps,
	captions: PropTypes.array,
	highEndCaption: PropTypes.string,
	lowEndCaption: PropTypes.string,
	max: PropTypes.number,
	min: PropTypes.number
};

export default withFormsy(Slider);
