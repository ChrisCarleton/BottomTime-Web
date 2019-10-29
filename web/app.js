/* eslint no-console: 0 */

import agent from './agent';
import alt from './alt';
import App from './components/app';
import config from './config';
import initialState from './initial-state';
import React from 'react';
import ReactDOM from 'react-dom';
import TanksActions from './tanks/actions/tanks-actions';

require('./validators');
require('./styles/main.less');
require('./img/loading-spinner.gif');
require('./img/reef-background.jpg');

require('./users/stores/current-user-store');
require('./tanks/stores/tanks-store');

(async () => {
	try {
		const authResult = await agent.get('/api/auth/me');
		alt.bootstrap(JSON.stringify({
			...initialState,
			CurrentUserStore: {
				currentUser: authResult.body
			}
		}));
		TanksActions.refreshTanks();
		document.body.style.background = 'url("/img/reef-background.jpg") center fixed no-repeat';
		document.body.style.backgroundSize = '100%,auto';
		document.body.style.backgroundColor = 'black';
	} catch (err) {
		if (err.response && err.response.status === 401) {
			agent.clearAuthToken();
		} else {
			console.error(JSON.stringify(err.response));
		}
		alt.bootstrap(JSON.stringify(initialState));
	} finally {
		ReactDOM.render(<App />, document.getElementById('app'));

		if (config.nodeEnv !== 'production') {
			module.hot.accept();
		}
	}
})();
