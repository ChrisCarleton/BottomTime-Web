import config from '../config';
import { GoogleApiWrapper, Map } from 'google-maps-react';
import PropTypes from 'prop-types';
import React from 'react';

class WorldMap extends React.Component {
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
				/>
			</div>
		);
	}
}

WorldMap.propTypes = {
	google: PropTypes.object.isRequired,
	height: PropTypes.string,
	width: PropTypes.string
};

export default GoogleApiWrapper({
	apiKey: config.googleMapsApiKey
})(WorldMap);
