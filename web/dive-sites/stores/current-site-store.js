import alt from '../../alt';
import CurrentDiveSiteActions from '../actions/current-site-actions';

class CurrentDiveSiteStore {
	constructor() {
		this.currentDiveSite = {};
		this.currentSiteRatings = [];
		this.isLoadingRatings = true;

		this.bindListeners({
			handleUpdateCurrentDiveSite: CurrentDiveSiteActions.UPDATE_CURRENT_DIVE_SITE,
			handleUpdateGpsCoords: CurrentDiveSiteActions.UPDATE_GPS_COORDS,
			handleBeginLoadRatings: CurrentDiveSiteActions.BEGIN_LOADING_RATINGS,
			handleEndLoadRatings: CurrentDiveSiteActions.END_LOADING_RATINGS,
			handleLoadSiteRatings: CurrentDiveSiteActions.LOAD_RATINGS,
			handleAddSiteRating: CurrentDiveSiteActions.ADD_RATING
		});

		this.handleUpdateCurrentDiveSite = this.handleUpdateCurrentDiveSite.bind(this);
		this.handleUpdateGpsCoords = this.handleUpdateGpsCoords.bind(this);
		this.handleLoadSiteRatings = this.handleLoadSiteRatings.bind(this);
		this.handleAddSiteRating = this.handleAddSiteRating.bind(this);
		this.handleBeginLoadRatings = this.handleBeginLoadRatings.bind(this);
		this.handleEndLoadRatings = this.handleEndLoadRatings.bind(this);
	}

	handleUpdateCurrentDiveSite(diveSite) {
		this.currentDiveSite = diveSite || {};
	}

	handleUpdateGpsCoords(latLon) {
		this.currentDiveSite.gps = latLon;
	}

	handleLoadSiteRatings(ratings) {
		this.currentSiteRatings = ratings || [];
		this.isLoadingRatings = false;
	}

	handleAddSiteRating(rating) {
		this.currentSiteRatings.splice(0, 0, rating);
	}

	handleBeginLoadRatings() {
		this.isLoadingRatings = true;
	}

	handleEndLoadRatings() {
		this.isLoadingRatings = false;
	}
}

export default alt.createStore(CurrentDiveSiteStore, 'CurrentDiveSiteStore');
