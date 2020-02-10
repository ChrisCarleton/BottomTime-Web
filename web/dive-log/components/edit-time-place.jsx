import { Col, Row } from 'react-flexbox-grid';
import { Glyphicon } from 'react-bootstrap';
import config from '../../config';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import TextBox from '../../components/text-box';

class TimeAndPlace extends React.Component {
	render() {
		const { currentEntry } = this.props;
		const gps = this.props.currentEntry.gps || {};
		const entryTime = currentEntry.entryTime
			? moment(this.props.currentEntry.entryTime).format(config.entryTimeFormat)
			: '';

		return (
			<Row>
				<Col sm={ 12 } md={ 6 }>
					<h3><Glyphicon glyph="map-marker" />&nbsp;Time and Place</h3>
					<TextBox
						name="location"
						controlId="location"
						label="Location"
						placeholder="City or Area"
						required
						value={ currentEntry.location || '' }
						maxLength={ 200 }
						validations={ {
							maxLength: 200
						} }
						validationErrors={ {
							maxLength: 'Location cannot be more than 200 characters long.'
						} }
					/>
					<TextBox
						name="site"
						controlId="site"
						label="Dive site"
						required
						value={ currentEntry.site || '' }
						maxLength={ 200 }
						validations={ {
							maxLength: 200
						} }
						validationErrors={ {
							maxLength: 'Site cannot be more than 200 characters long.'
						} }
					/>
					<TextBox
						name="entryTime"
						controlId="entryTime"
						label="Entry time"
						required
						placeholder={ moment().format(config.entryTimeFormat) }
						value={ entryTime }
						validations={ {
							isDateTime: config.entryTimeFormat
						} }
						validationErrors={ {
							isDateTime: 'Entry time must in the format of yyyy-mm-dd h:mm(am/pm).'
						} }
					/>
					<TextBox
						name="bottomTime"
						controlId="bottomTime"
						label="Bottom time"
						value={ currentEntry.bottomTime || '' }
						units="minutes"
						required
						validations={ {
							isGreaterThan: 0
						} }
						validationErrors={ {
							isGreaterThan: 'Bottom time must be a positive number.'
						} }
					/>
					<TextBox
						name="totalTime"
						controlId="totalTime"
						label="Total time"
						value={ currentEntry.totalTime || '' }
						units="minutes"
						validations={ {
							isGreaterThan: 0,
							isGreaterThanOrEqualToField: 'bottomTime'
						} }
						validationErrors={ {
							isGreaterThan: 'Total time must be a positive number.',
							isGreaterThanOrEqualToField:
								'Total time cannot be less than what you recorded for bottom time.'
						} }
					/>
					<TextBox
						name="surfaceInterval"
						controlId="surfaceInterval"
						label="Surface interval"
						value={ currentEntry.surfaceInterval || '' }
						units="minutes"
						validations={ {
							isGreaterThan: 0
						} }
						validationErrors={ {
							isGreaterThan: 'Surface interval time must be a positive number.'
						} }
					/>
				</Col>
				<Col sm={ 12 } md={ 6 }>
					<h4>GPS</h4>
					<TextBox
						name="gps.latitude"
						controlId="gps.latitude"
						label="Latitude"
						value={ gps.latitude || '' }
						validations={ {
							isBetween: { min: -90.0, max: 90.0 }
						} }
						validationErrors={ {
							isBetween: 'Latitude must be between -90 and 90 degrees.'
						} }
						units="&deg;"
					/>
					<TextBox
						name="gps.longitude"
						controlId="gps.longitude"
						label="Longitude"
						value={ gps.longitude || '' }
						validations={ {
							isBetween: { min: -180.0, max: 180.0 }
						} }
						validationErrors={ {
							isBetween: 'Longitude must be between -180 and 180 degrees.'
						} }
						units="&deg;"
					/>
				</Col>
			</Row>
		);
	}
}

TimeAndPlace.propTypes = {
	currentEntry: PropTypes.object.isRequired
};

export default TimeAndPlace;
