import alt from '../../alt';
import CurrentDiveSiteActions from '../actions/current-site-actions';

class CurrentDiveSiteStore {
	constructor() {
		this.currentDiveSite = {};

		this.bindListeners({
			handleUpdateCurrentDiveSite: CurrentDiveSiteActions.UPDATE_CURRENT_DIVE_SITE,
			handleUpdateGpsCoords: CurrentDiveSiteActions.UPDATE_GPS_COORDS
		});

		this.handleUpdateCurrentDiveSite = this.handleUpdateCurrentDiveSite.bind(this);
		this.handleUpdateGpsCoords = this.handleUpdateGpsCoords.bind(this);
	}

	handleUpdateCurrentDiveSite(diveSite) {
		this.currentDiveSite = diveSite || {};
	}

	handleUpdateGpsCoords(latLon) {
		this.currentDiveSite.gps = latLon;
	}
}

export default alt.createStore(CurrentDiveSiteStore, 'CurrentDiveSiteStore');
