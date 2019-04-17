import {
	Col,
	Row
} from 'react-bootstrap';
import connectToStores from 'alt-utils/lib/connectToStores';
import CurrentUserStore from '../../users/stores/current-user-store';
import Formsy from 'formsy-react';
import React from 'react';
import StaticField from '../../components/static-field';
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
		return value ? `${ value }minutes` : null;
	}

	renderDepth(value) {
		return value ? `${ value }${ this.props.currentUser.distanceUnit }` : null;
	}

	renderWeight(value) {
		return value ? `${ value }${ this.props.currentUser.weightUnit }` : null;
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
								value={ currentEntry.entryTime }
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
						</Col>
						<Col sm={ 12 } md={ 6 }>
							<h4>GPS</h4>
							<StaticField
								controlId="gps_latitude"
								name="gps_latitude"
								label="Latitude"
								default={ Unspecified }
								value={ latitude }
							/>
							<StaticField
								controlId="gps_longitude"
								name="gps_longitude"
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
								controlId="weight_amount"
								name="weight_amount"
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
