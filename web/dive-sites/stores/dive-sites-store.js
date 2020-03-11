import alt from '../../alt';
import DiveSitesActions from '../actions/dive-sites-actions';

class DiveSitesStore {
	constructor() {
		this.isLoadingSites = false;
		this.isPristine = true;
		this.diveSites = [];

		this.bindListeners({
			handleBeginLoadingSites: DiveSitesActions.BEGIN_LOADING_SITES,
			handleFinishLoadingSites: DiveSitesActions.FINISH_LOADING_SITES,
			handleUpdateSites: DiveSitesActions.UPDATE_SITES,
			handleAppendSites: DiveSitesActions.APPEND_SITES
		});

		this.handleBeginLoadingSites = this.handleBeginLoadingSites.bind(this);
		this.handleFinishLoadingSites = this.handleFinishLoadingSites.bind(this);
		this.handleUpdateSites = this.handleUpdateSites.bind(this);
		this.handleAppendSites = this.handleAppendSites.bind(this);
	}

	handleBeginLoadingSites() {
		this.isLoadingSites = true;
	}

	handleFinishLoadingSites() {
		this.isLoadingSites = false;
	}

	handleUpdateSites(sites) {
		this.diveSites = sites || [];
		this.isPristine = false;
		this.isLoadingSites = false;
	}

	handleAppendSites(sites) {
		this.diveSites = this.diveSites.concat(sites);
		this.isPristine = false;
		this.isLoadingSites = false;
	}
}

export default alt.createStore(DiveSitesStore, 'DiveSitesStore');
