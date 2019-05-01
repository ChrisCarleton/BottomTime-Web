import {
	Col,
	Row
} from 'react-bootstrap';
import config from '../../config';
import connectToStores from 'alt-utils/lib/connectToStores';
import CurrentUserStore from '../../users/stores/current-user-store';
import Formsy from 'formsy-react';
import moment from 'moment';
import React from 'react';
import StaticField from '../../components/static-field';
import { ToPreferredUnits } from '../../unit-conversion';
import PropTypes from 'prop-types';

const Unspecified = 'Unspecified';

class ViewLogEntry extends React.Component {
	static getStores() {
		return [ CurrentUserStore ];
	}

	static getPropsFromStores() {
		return {
			currentUser: CurrentUserStore.getState().currentUser
		};
	}

	renderTime(value) {
		return value || value === 0 ? `${ value }minutes` : null;
	}

	renderDepth(value) {
		if (!value && value !== 0) {
			return null;
		}

		const converted = ToPreferredUnits
			.Distance[this.props.currentUser.distanceUnit](value)
			.toFixed(2);
		return `${ converted }${ this.props.currentUser.distanceUnit }`;
	}

	renderTemperature(value) {
		if (!value && value !== 0) {
			return null;
		}

		const converted = ToPreferredUnits
			.Temperature[this.props.currentUser.temperatureUnit](value)
			.toFixed(2);
		return `${ converted }${ this.props.currentUser.temperatureUnit === 'c' ? '°C' : '°F' }`;
	}

	renderWeight(value) {
		if (!value && value !== 0) {
			return null;
		}

		const converted = ToPreferredUnits
			.Weight[this.props.currentUser.weightUnit](value)
			.toFixed(2);
		return `${ converted }${ this.props.currentUser.weightUnit }`;
	}

	render() {
		const { currentEntry } = this.props;
		const gps = currentEntry.gps || {};
		const weight = currentEntry.weight || {};

		const latitude = gps.latitude
			? `${ Math.abs(gps.latitude) } °${ gps.latitude >= 0 ? 'N' : 'S' }`
			: null;
		const longitude = gps.longitude
			? `${ Math.abs(gps.longitude) } °${ gps.longitude >= 0 ? 'E' : 'W' }`
			: null;

		return (
			<div>
				<Formsy className="form-horizontal">
					<Row>
						<Col sm={ 12 } md={ 6 }>
							<StaticField
								controlId="diveNumber"
								name="diveNumber"
								label="diveNumber"
								value={ currentEntry.diveNumber }
							/>
						</Col>
					</Row>
					<Row>
						<Col sm={ 12 } md={ 6 }>
							<h4>Time and Location</h4>
							<StaticField
								controlId="location"
								name="location"
								label="Location"
								value={ currentEntry.location }
							/>
							<StaticField
								controlId="site"
								name="site"
								label="Dive site"
								value={ currentEntry.site }
							/>
							<StaticField
								controlId="entryTime"
								name="entryTime"
								label="Entry time"
								value={
									moment(currentEntry.entryTime)
										.local()
										.format(config.entryTimeFormat)
								}
							/>
							<StaticField
								controlId="bottomTime"
								name="bottomTime"
								label="Bottom time"
								value={ this.renderTime(currentEntry.bottomTime) }
								default={ Unspecified }
							/>
							<StaticField
								controlId="totalTime"
								name="totalTime"
								label="Total time"
								value={ this.renderTime(currentEntry.totalTime) }
								default={ Unspecified }
							/>
							<StaticField
								controlId="surfaceInterval"
								name="surfaceInterval"
								label="Surface interval"
								value={ this.renderTime(currentEntry.surfaceInterval) }
								default={ Unspecified }
							/>
						</Col>
						<Col sm={ 12 } md={ 6 }>
							<h4>GPS</h4>
							<StaticField
								controlId="gps.latitude"
								name="gps.latitude"
								label="Latitude"
								default={ Unspecified }
								value={ latitude }
							/>
							<StaticField
								controlId="gps.longitude"
								name="gps.longitude"
								label="Longitude"
								default={ Unspecified }
								value={ longitude }
							/>
						</Col>
					</Row>
					<Row>
						<Col md={ 6 } sm={ 12 }>
							<h4>Dive Info</h4>
							<StaticField
								controlId="averageDepth"
								name="averageDepth"
								label="Average depth"
								value={ this.renderDepth(currentEntry.averageDepth) }
								default={ Unspecified }
							/>
							<StaticField
								controlId="maxDepth"
								name="maxDepth"
								label="Max. depth"
								value={ this.renderDepth(currentEntry.maxDepth) }
								default={ Unspecified }
							/>
						</Col>
						<Col md={ 6 } sm={ 12 }>
							<h4>Weight</h4>
							<StaticField
								controlId="weight.amount"
								name="weight.amount"
								label="Amount worn"
								default={ Unspecified }
								value={ this.renderWeight(weight.amount) }
							/>
						</Col>
					</Row>
				</Formsy>
			</div>
		);
	}
}

ViewLogEntry.propTypes = {
	currentEntry: PropTypes.object.isRequired,
	currentUser: PropTypes.object.isRequired
};

export default connectToStores(ViewLogEntry);
