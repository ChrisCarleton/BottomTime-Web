import CurrentUserActions from './users/actions/current-user-actions';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';

require('./alt');
require('./validators');
require('./styles.css');

ReactDOM.render(<App />, document.getElementById('app'));
CurrentUserActions.fetchCurrentUser();
