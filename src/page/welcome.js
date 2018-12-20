import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link
} from "react-router-dom";

export default class Welcome extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
					<h1>Welcome</h1>
				</div>
		);
	}
}