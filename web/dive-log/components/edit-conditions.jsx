import {
	Col,
	Glyphicon,
	Row
} from 'react-bootstrap';
import LogEntryUtilities from './log-entry-utilities';
import PropTypes from 'prop-types';
import React from 'react';
import TextBox from '../../components/text-box';

class Conditions extends React.Component {
	render() {
		const { currentEntry, temperatureUnit } = this.props;
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
						<ul>
							<li>Visibility?</li>
							<li>Wind?</li>
							<li>Current?</li>
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
	temperatureUnit: PropTypes.oneOf([ 'c', 'f' ])
};

export default Conditions;
