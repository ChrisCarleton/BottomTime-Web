/* eslint no-undefined: 0 */

import config from '../config';
import { GoogleApiWrapper, Map, Marker as MapMarker } from 'google-maps-react';
import PropTypes from 'prop-types';
import React from 'react';

class WorldMap extends React.Component {
	constructor(props) {
		super(props);

		this.handleMapClicked = this.handleMapClicked.bind(this);
	}

	handleMapClicked(props, map, clickEvent) {
		if (this.props.onClick) {
			this.props.onClick({
				lat: clickEvent.latLng.lat(),
				lon: clickEvent.latLng.lng()
			});
		}
	}

	render() {
		const style = {
			width: this.props.width,
			height: this.props.height,
			position: 'relative'
		};

		let { initialCenter } = this.props;
		if (initialCenter && initialCenter.lat && initialCenter.lon) {
			initialCenter = {
				lat: initialCenter.lat,
				lng: initialCenter.lon
			};
		} else {
			initialCenter = undefined;
		}

		return (
			<div style={ style }>
				<Map
					centerAroundCurrentLocation={ initialCenter === undefined }
					google={ this.props.google }
					zoom={ 12 }
					initialCenter={ initialCenter }
					streetViewControl={ false }
					fullscreenControl={ false }
					onClick={ this.handleMapClicked }
				>
					{ this.props.children }
				</Map>
			</div>
		);
	}
}

WorldMap.propTypes = {
	children: PropTypes.node,
	google: PropTypes.object.isRequired,
	height: PropTypes.string,
	initialCenter: PropTypes.object,
	onClick: PropTypes.func,
	width: PropTypes.string
};

export default GoogleApiWrapper({
	apiKey: config.googleMapsApiKey
})(WorldMap);

export const Marker = MapMarker;
