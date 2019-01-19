/* eslint no-console: 0 */

import agent from './agent';
import alt from './alt';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';

require('./validators');
require('./styles/main.less');
require('./img/loading-spinner.gif');
require('./img/reef-background.jpg');

agent.get('/api/auth/me')
	.then(result => {
		alt.bootstrap(JSON.stringify({
			CurrentUserStore: {
				currentUser: result.body
			}
		}));
	})
	.catch(err => {
		alt.bootstrap(JSON.stringify({
			CurrentUserStore: {
				currentUser: {
					username: 'Anonymous',
					email: '',
					createdAt: null,
					role: 'user',
					isAnonymous: true,
					isLockedOut: false
				}
			}
		}));
		console.error(err);
	})
	.finally(() => {
		ReactDOM.render(<App />, document.getElementById('app'));
	});
