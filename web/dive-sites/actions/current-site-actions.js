import alt from '../../alt';

class CurrentDiveSiteActions {
	updateCurrentDiveSite(diveSite) {
		return diveSite;
	}

	updateGpsCoords(latLon) {
		return latLon;
	}

	beginLoadingRatings() {
		return true;
	}

	endLoadingRatings() {
		return true;
	}

	loadRatings(ratings) {
		return ratings;
	}

	addRating(rating) {
		return rating;
	}
}

export default alt.createActions(CurrentDiveSiteActions);
