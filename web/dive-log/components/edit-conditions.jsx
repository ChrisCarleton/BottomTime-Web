import {
	Col,
	Glyphicon,
	Row
} from 'react-bootstrap';
import LogEntryUtilities from './log-entry-utilities';
import PropTypes from 'prop-types';
import React from 'react';
import Slider from '../../components/slider';
import TextBox from '../../components/text-box';

class Conditions extends React.Component {
	render() {
		const { currentEntry, distanceUnit, temperatureUnit } = this.props;
		const temperature = currentEntry.temperature || {};
		temperature.thermoclines = temperature.thermoclines || [];
		temperature.thermoclines[0] = temperature.thermoclines[0] || {};

		let temperatureUnitString = '°C';
		let temperatureLowerBound = -2;
		let temperatureUpperBound = 50;
		let temperatureLowerBoundError = 'Temperature cannot be below -2°C.';
		let temperatureUpperBoundError = 'Temperature cannot be above 50°C.';

		if (temperatureUnit === 'f') {
			temperatureUnitString = '°F';
			temperatureLowerBound = 28.4;
			temperatureUpperBound = 120;
			temperatureLowerBoundError = 'Temperature cannot be below 28.4°F.';
			temperatureUpperBoundError = 'Temperature cannot be above 122°F.';
		}

		return (
			<div>
				<Row>
					<Col sm={ 12 }>
						<h3><Glyphicon glyph="sunglasses" />&nbsp;Conditions</h3>
					</Col>
				</Row>
				<Row>
					<Col sm={ 12 } md={ 6 }>
						<TextBox
							name="temperature.surface"
							controlId="temperature.surface"
							label="Surface temp"
							value={ LogEntryUtilities.renderTemperature(temperature.surface, temperatureUnit) || '' }
							units={ temperatureUnitString }
							validations={ {
								isNumeric: true,
								isGreaterThanOrEqual: temperatureLowerBound,
								isLessThanOrEqual: temperatureUpperBound
							} }
							validationErrors={ {
								isNumeric: 'Temperature must be a number',
								isGreaterThanOrEqual: temperatureLowerBoundError,
								isLessThanOrEqual: temperatureUpperBoundError
							} }
						/>
						<TextBox
							name="temperature.water"
							controlId="temperature.water"
							label="Water temp"
							value={ LogEntryUtilities.renderTemperature(temperature.water, temperatureUnit) || '' }
							units={ temperatureUnitString }
							validations={ {
								isNumeric: true,
								isGreaterThanOrEqual: temperatureLowerBound,
								isLessThanOrEqual: temperatureUpperBound
							} }
							validationErrors={ {
								isNumeric: 'Temperature must be a number',
								isGreaterThanOrEqual: temperatureLowerBoundError,
								isLessThanOrEqual: temperatureUpperBoundError
							} }
						/>
						<TextBox
							name="temperature.thermoclines[0].temperature"
							controlId="temperature.thermoclines[0].temperature"
							label="Thermocline"
							value={
								LogEntryUtilities.renderTemperature(
									temperature.thermoclines[0].temperature,
									temperatureUnit) || ''
							}
							units={ temperatureUnitString }
							validations={ {
								isNumeric: true,
								isGreaterThanOrEqual: temperatureLowerBound,
								isLessThanOrEqual: temperatureUpperBound
							} }
							validationErrors={ {
								isNumeric: 'Temperature must be a number',
								isGreaterThanOrEqual: temperatureLowerBoundError,
								isLessThanOrEqual: temperatureUpperBoundError
							} }
						/>
					</Col>
					<Col sm={ 12 } md={ 6 }>
						<Slider
							controlId="visibility"
							name="visibility"
							label="Visibility"
							min={ 1 }
							max={ 5 }
							value={ currentEntry.visibility }
							lowEndCaption="Very poor"
							highEndCaption="Crystal clear"
							captions={
								distanceUnit === 'ft'
									? [
										{ threshold: 1, caption: 'Can\'t see your own hand' },
										{ threshold: 2, caption: 'Less than 15\'' },
										{ threshold: 3, caption: '15-40\'' },
										{ threshold: 4, caption: '40-100\'' },
										{ threshold: 5, caption: '100+ feet' }
									]
									: [
										{ threshold: 1, caption: 'Can\'t see your own hand' },
										{ threshold: 2, caption: 'Less than 3m' },
										{ threshold: 3, caption: '3-12m' },
										{ threshold: 4, caption: '12-30m' },
										{ threshold: 5, caption: '30+ meters' }
									]
							}
						/>
						<Slider
							controlId="wind"
							name="wind"
							label="Wind"
							min={ 1 }
							max={ 5 }
							value={ currentEntry.wind }
							lowEndCaption="No wind"
							highEndCaption="Extreme wind"
							captions={
								[
									{ threshold: 1, caption: 'No wind' },
									{ threshold: 2, caption: 'Light breeze' },
									{ threshold: 3, caption: 'Windy' },
									{ threshold: 4, caption: 'Gusty' },
									{ threshold: 5, caption: 'Gale force wind' }
								]
							}
						/>
						<Slider
							controlId="current"
							name="current"
							label="Current"
							min={ 1 }
							max={ 5 }
							value={ currentEntry.current }
							lowEndCaption="No current"
							highEndCaption="Extreme current"
							captions={
								[
									{ threshold: 1, caption: 'No current' },
									{ threshold: 2, caption: 'Gentle current' },
									{ threshold: 3, caption: 'Moderate current' },
									{ threshold: 4, caption: 'Fast current' },
									{ threshold: 5, caption: 'Holy s***!' }
								]
							}
						/>
						<Slider
							controlId="waterChoppiness"
							name="waterChoppiness"
							label="Water conditions"
							min={ 1 }
							max={ 5 }
							value={ currentEntry.waterChoppiness }
							lowEndCaption="Calm"
							highEndCaption="Extremely choppy"
							captions={
								[
									{ threshold: 1, caption: 'Smooth like glass' },
									{ threshold: 2, caption: 'Gentle waves' },
									{ threshold: 3, caption: 'Moderately wavey' },
									{ threshold: 4, caption: 'Big swells' },
									{ threshold: 5, caption: 'A perfect storm!' }
								]
							}
						/>
						<ul>
							<li>Weather?</li>
							<li>Exposure gear?</li>
						</ul>
					</Col>
				</Row>
			</div>
		);
	}
}

Conditions.propTypes = {
	currentEntry: PropTypes.object.isRequired,
	distanceUnit: PropTypes.oneOf([ 'm', 'ft' ]),
	temperatureUnit: PropTypes.oneOf([ 'c', 'f' ])
};

export default Conditions;
