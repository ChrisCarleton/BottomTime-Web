import alt from '../../alt';
import DiveSitesActions from '../actions/dive-sites-actions';

class DiveSitesStore {
	constructor() {
		this.isLoadingSites = true;
		this.diveSites = [];

		this.bindListeners({
			handleBeginLoadingSites: DiveSitesActions.BEGIN_LOADING_SITES,
			handleFinishLoadingSites: DiveSitesActions.FINISH_LOADING_SITES,
			handleUpdateSites: DiveSitesActions.UPDATE_SITES
		});

		this.handleBeginLoadingSites = this.handleBeginLoadingSites.bind(this);
		this.handleFinishLoadingSites = this.handleFinishLoadingSites.bind(this);
		this.handleUpdateSites = this.handleUpdateSites.bind(this);
	}

	handleBeginLoadingSites() {
		this.isLoadingSites = true;
	}

	handleFinishLoadingSites() {
		this.isLoadingSites = false;
	}

	handleUpdateSites(sites) {
		this.diveSites = sites || [];
		this.isLoadingSites = false;
	}
}

export default alt.createStore(DiveSitesStore, 'DiveSitesStore');
