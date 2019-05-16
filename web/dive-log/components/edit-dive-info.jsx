import {
	Col,
	Glyphicon,
	Row
} from 'react-bootstrap';
import LogEntryUtilities from './log-entry-utilities';
import PropTypes from 'prop-types';
import RadioList from '../../components/radio-list';
import React from 'react';
import TextBox from '../../components/text-box';

class DiveInfo extends React.Component {
	/* eslint-disable complexity */
	render() {
		const { currentEntry, distanceUnit, pressureUnit, weightUnit } = this.props;
		const weight = currentEntry.weight || {};
		const air = currentEntry.air || [];
		air[0] = air[0] || {};
		const decoStops = currentEntry.decoStops || [];
		decoStops[0] = decoStops[0] || {};

		return (
			<div>
				<Row>
					<Col sm={ 12 }>
						<h3><Glyphicon glyph="dashboard" />&nbsp;Dive Info</h3>
					</Col>
				</Row>
				<Row>
					<Col md={ 6 } sm={ 12 }>
						<strong>Depth</strong>
						<TextBox
							name="averageDepth"
							controlId="averageDepth"
							label="Average depth"
							value={ LogEntryUtilities.renderDepth(currentEntry.averageDepth, distanceUnit) }
							units={ distanceUnit }
							validations={ {
								isGreaterThan: 0
							} }
							validationErrors={ {
								isGreaterThan: 'Average depth must be a positive number.'
							} }
						/>
						<TextBox
							name="maxDepth"
							controlId="maxDepth"
							label="Max. depth"
							value={ LogEntryUtilities.renderDepth(currentEntry.maxDepth, distanceUnit) }
							units={ distanceUnit }
							required
							validations={ {
								isGreaterThan: 0,
								isGreaterThanOrEqualToField: 'averageDepth'
							} }
							validationErrors={ {
								isGreaterThan: 'Maximum depth must be a positive number.',
								isGreaterThanOrEqualToField:
									'Maximum depth cannot be less than the average depth of the dive.'
							} }
						/>
						<strong>Weight</strong>
						<TextBox
							name="weight.belt"
							controlId="weight.belt"
							label="Weight belt"
							value={ LogEntryUtilities.renderWeight(weight.belt, weightUnit) }
							units={ weightUnit }
							validations={ {
								isGreaterThanOrEqual: 0
							} }
							validationErrors={ {
								isGreaterThanOrEqual: 'Amount worn cannot be a negative number.'
							} }
						/>
						<TextBox
							name="weight.integrated"
							controlId="weight.integrated"
							label="Integrated pockets"
							value={ LogEntryUtilities.renderWeight(weight.integrated, weightUnit) }
							units={ weightUnit }
							validations={ {
								isGreaterThanOrEqual: 0
							} }
							validationErrors={ {
								isGreaterThanOrEqual: 'Amount worn cannot be a negative number.'
							} }
						/>
						<TextBox
							name="weight.backplate"
							controlId="weight.backplate"
							label="Backplate/Trim"
							value={ LogEntryUtilities.renderWeight(weight.backplate, weightUnit) }
							units={ weightUnit }
							validations={ {
								isGreaterThanOrEqual: 0
							} }
							validationErrors={ {
								isGreaterThanOrEqual: 'Amount worn cannot be a negative number.'
							} }
						/>
						<TextBox
							name="weight.ankles"
							controlId="weight.ankles"
							label="Ankle weights"
							value={ LogEntryUtilities.renderWeight(weight.ankles, weightUnit) }
							units={ weightUnit }
							validations={ {
								isGreaterThanOrEqual: 0
							} }
							validationErrors={ {
								isGreaterThanOrEqual: 'Amount worn cannot be a negative number.'
							} }
						/>
						<TextBox
							name="weight.other"
							controlId="weight.other"
							label="Other weights"
							value={ LogEntryUtilities.renderWeight(weight.other, weightUnit) }
							units={ weightUnit }
							validations={ {
								isGreaterThanOrEqual: 0
							} }
							validationErrors={ {
								isGreaterThanOrEqual: 'Amount worn cannot be a negative number.'
							} }
						/>
						<RadioList
							controlId="weight.correctness"
							name="weight.correctness"
							label="Correctness"
							value={ weight.correctness || '' }
							inline
						>
							{ [
								{ text: 'Good', value: 'good' },
								{ text: 'Too much', value: 'too much' },
								{ text: 'Too little', value: 'too little' }
							] }
						</RadioList>
						<RadioList
							controlId="weight.trim"
							name="weight.trim"
							label="Trim"
							value={ weight.trim || '' }
							inline
						>
							{ [
								{ text: 'Good', value: 'good' },
								{ text: 'Feet down', value: 'feet down' },
								{ text: 'Feet up', value: 'feet up' }
							] }
						</RadioList>
						<strong>Safety Stop</strong>
						<TextBox
							name="decoStops[0].depth"
							controlId="decoStops[0].depth"
							label="Depth"
							value={ LogEntryUtilities.renderDepth(decoStops[0].depth, distanceUnit) }
							units={ distanceUnit }
							validations={ {
								isGreaterThan: 0
							} }
							validationErrors={ {
								isGreaterThan: 'Safety stop depth must be a positive number.'
							} }
						/>
						<TextBox
							name="decoStops[0].duration"
							controlId="decoStops[0].duration"
							label="Duration"
							value={ decoStops[0].duration || '' }
							units="minutes"
							validations={ {
								isGreaterThan: 0
							} }
							validationErrors={ {
								isGreaterThan: 'Safety stop duration must be a positive number.'
							} }
						/>
					</Col>
					<Col md={ 6 } sm={ 12 }>
						<strong>Air</strong>
						<TextBox
							name="air[0].in"
							controlId="air[0].in"
							label="Start pressure"
							value={ LogEntryUtilities.renderPressure(air[0].in, pressureUnit) }
							units={ pressureUnit }
							validations={ {
								isGreaterThan: 0,
								isGreaterThanOrEqualToField: 'air[0].out'
							} }
							validationErrors={ {
								isGreaterThan: 'Starting pressure must be a positive number.',
								isGreaterThanOrEqualToField: 'Starting pressure must be greater than end pressure.'
							} }
						/>
						<TextBox
							name="air[0].out"
							controlId="air[0].out"
							label="End pressure"
							value={ LogEntryUtilities.renderPressure(air[0].out, pressureUnit) }
							units={ pressureUnit }
							validations={ {
								isGreaterThanOrEqual: 0
							} }
							validationErrors={ {
								isGreaterThanOrEqual: 'Ending pressure must be a positive number.'
							} }
						/>
						<TextBox
							name="air[0].size"
							controlId="air[0].size"
							label="Tank volume"
							value={ air[0].size || '' }
							units="L"
							validations={ {
								isGreaterThan: 0
							} }
							validationErrors={ {
								isGreaterThan: 'Tank size must be a positive number.'
							} }
						/>
						<TextBox
							name="air[0].workingPressure"
							controlId="air[0].workingPressure"
							label="Working pressure"
							value={ LogEntryUtilities.renderPressure(air[0].workingPressure, pressureUnit) }
							units={ pressureUnit }
							validations={ {
								isGreaterThan: 0
							} }
							validationErrors={ {
								isGreaterThan: 'Working pressure must be a positive number.'
							} }
						/>
						<RadioList
							controlId="air[0].material"
							name="air[0].material"
							label="Tanks"
							value={ air[0].material || '' }
							inline
						>
							{ [
								{ text: 'Aluminum', value: 'al' },
								{ text: 'Steel', value: 'fe' }
							] }
						</RadioList>
						<TextBox
							name="air[0].oxygen"
							controlId="air[0].oxygen"
							label="Oxygen content"
							value={ air[0].oxygen || '' }
							units={ '%' }
							validations={ {
								isGreaterThanOrEqual: 1,
								isLessThanOrEqual: 100
							} }
							validationErrors={ {
								isGreaterThanOrEqual: 'Oxygen content must be at least 1%.',
								isLessThanOrEqual: 'Oxygen content cannot be more than 100%.'
							} }
						/>
					</Col>
				</Row>
			</div>
		);
	}
	/* eslint-enable complexity */
}

DiveInfo.propTypes = {
	currentEntry: PropTypes.object.isRequired,
	distanceUnit: PropTypes.string.isRequired,
	pressureUnit: PropTypes.string.isRequired,
	weightUnit: PropTypes.string.isRequired
};

export default DiveInfo;
