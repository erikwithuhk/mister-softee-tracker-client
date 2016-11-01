import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Routes from './config/Routes.jsx';
import store from './store';

ReactDOM.render(<Provider store={store} ><Routes /></Provider>, document.querySelector('.root'));
