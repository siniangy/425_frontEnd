import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import NewsVisualization from './index.js';

// 定义Route ???
/*const Element = () => (
	<Switch>
		<Route path="/home" component={NewsVisualization} />
	</Switch>
)*/

ReactDOM.render(
	<NewsVisualization />,
	document.getElementById('app')
);