import config from '../config';
import { GoogleApiWrapper, Map } from 'google-maps-react';
import PropTypes from 'prop-types';
import React from 'react';

class WorldMap extends React.Component {
	render() {
		const style = {
			width: '600px',
			height: '450px',
			position: 'relative'
		};
		return (
			<div style={ style }>
				<Map
					google={ this.props.google }
					zoom={ 14 }
					streetViewControl={ false }
					fullscreenControl={ false }
				/>
			</div>
		);
	}
}

WorldMap.propTypes = {
	google: PropTypes.object.isRequired
};

export default GoogleApiWrapper({
	apiKey: config.googleMapsApiKey
})(WorldMap);
