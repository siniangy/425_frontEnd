import React from 'react';
import {
	Button
} from 'antd';
import './style/index.less'

class NewsVisualization extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}
	componentDidMount() {

	}
	componentWillMount() {

	}
	render() {
		return (
			<div>
				<h1 style={{color: 'red'}}>12345</h1>
				<h2 className='h2'>4567</h2>
				<Button type='primary'>确认</Button>
			</div>
		)
	}
}

export default NewsVisualization;