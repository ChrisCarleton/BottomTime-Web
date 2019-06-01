import alt from '../../alt';

class CurrentDiveSiteActions {
	updateCurrentDiveSite(diveSite) {
		return diveSite;
	}

	updateGpsCoords(latLon) {
		return latLon;
	}
}

export default alt.createActions(CurrentDiveSiteActions);
