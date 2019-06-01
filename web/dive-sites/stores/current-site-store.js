import alt from '../../alt';
import CurrentDiveSiteActions from '../actions/current-site-actions';

class CurrentDiveSiteStore {
	constructor() {
		this.currentDiveSite = {};

		this.bindListeners({
			handleUpdateGpsCoords: CurrentDiveSiteActions.UPDATE_GPS_COORDS
		});

		this.handleUpdateGpsCoords = this.handleUpdateGpsCoords.bind(this);
	}

	handleUpdateGpsCoords(latLon) {
		this.currentDiveSite.gps = latLon;
	}
}

export default alt.createStore(CurrentDiveSiteStore, 'CurrentDiveSiteStore');
