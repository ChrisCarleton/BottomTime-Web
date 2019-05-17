import agent from '../../agent';
import alt from '../../alt';

class TanksActions {
	refreshTanks() {
		return async dispatch => {
			dispatch();
			try {
				const { body } = await agent.get('/api/tanks');
				const tanks = {};
				body.forEach(tank => {
					tanks[tank.name] = tank;
				});
				this.setTanks(tanks);
			} catch (err) {
				/* eslint-disable no-console */
				console.error(err);
				/* eslint-enable no-console */
			}
		};
	}

	setTanks(tanks) {
		return tanks;
	}

	updateTank(tank, oldName) {
		return [ tank, oldName ];
	}

	removeTank(name) {
		return name;
	}
}

export default alt.createActions(TanksActions);
