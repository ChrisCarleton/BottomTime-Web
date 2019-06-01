import alt from '../../alt';

class DiveSitesActions {
	beginLoadingSites() {
		return true;
	}

	finishLoadingSites() {
		return true;
	}

	updateSites(sites) {
		return sites;
	}
}

export default alt.createActions(DiveSitesActions);
