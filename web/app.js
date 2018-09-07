import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';

require('./alt');
require('./styles.css');

ReactDOM.render(<App />, document.getElementById('app'));
