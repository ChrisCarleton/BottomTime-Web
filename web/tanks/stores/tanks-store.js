import alt from '../../alt';
import TanksActions from '../actions/tanks-actions';

class TankStore {
	constructor() {
		this.userTanks = [];

		this.bindListeners({
			onSetTanks: TanksActions.SET_TANKS,
			onUpdateTank: TanksActions.UPDATE_TANK,
			onRemoveTank: TanksActions.REMOVE_TANK
		});

		this.onSetTanks = this.onSetTanks.bind(this);
		this.onUpdateTank = this.onUpdateTank.bind(this);
		this.onRemoveTank = this.onRemoveTank.bind(this);
	}

	onSetTanks(tanks) {
		this.userTanks = tanks;
	}

	onUpdateTank([ tank, oldName ]) {
		if (oldName) {
			delete this.userTanks[oldName];
		}
		this.userTanks[tank.name] = tank;
	}

	onRemoveTank(name) {
		delete this.userTanks[name];
	}
}

export default alt.createStore(TankStore, 'TankStore');
