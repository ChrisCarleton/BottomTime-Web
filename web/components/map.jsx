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
		return (
			<div style={ style }>
				<Map
					centerAroundCurrentLocation
					google={ this.props.google }
					zoom={ 13 }
					streetViewControl={ false }
					fullscreenControl={ false }
					onClick={ this.handleMapClicked }
				/>
			</div>
		);
	}
}

WorldMap.propTypes = {
	google: PropTypes.object.isRequired,
	height: PropTypes.string,
	onClick: PropTypes.func,
	width: PropTypes.string
};

export default GoogleApiWrapper({
	apiKey: config.googleMapsApiKey
})(WorldMap);

export const Marker = MapMarker;
