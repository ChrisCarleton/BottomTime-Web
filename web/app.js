import agent from './agent';
import alt from './alt';
import App from './components/app';
import React from 'react';
import ReactDOM from 'react-dom';

require('./validators');
require('./styles/main.less');

let currentUser = {
	username: 'Anonymous_User',
	email: '',
	createdAt: null,
	role: 'user',
	isAnonymous: true,
	isLockedOut: false
};

(async () => {
	try {
		const result = await agent.withCredentials().get('/api/auth/me');
		currentUser = result.body;
	} catch(err) {
		console.error(err);
	}
})();

console.log(JSON.stringify({
	CurrentUserStore: {
		currentUser
	}
})
);

alt.bootstrap(
	JSON.stringify({
		CurrentUserStore: {
			currentUser
		}
	})
);
ReactDOM.render(<App />, document.getElementById('app'));
