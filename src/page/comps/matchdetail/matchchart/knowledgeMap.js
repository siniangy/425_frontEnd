import React from 'react';
import $ from 'jquery';

export default class knowledgeMap extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			target: this.props.target
		}
	}
	componentWillMount() {
		console.log(this.state.target)
		this.getKnowledgeMapData('https://api.ownthink.com/kg/knowledge?entity=' + this.props.target.toString())
	}
	componentDidMount() {

	}
	componentWillReceiveProps(nextProps) {
		if (this.props.target !== nextProps.target) {
			if (nextProps.target) {
				this.setState({
					target: nextProps.target
				}, () => {
					console.log(this.state.target)
				})
				this.getKnowledgeMapData('https://api.ownthink.com/kg/knowledge?entity=' + this.state.target.toString())
			}
		}
	}
	getKnowledgeMapData(url) {
		$.ajax({
			url: url,
			type: 'get',
			dataType: 'json',
			success: data => {
				this.setState({
					// playByplayData: data
				}, () => {

				})
				console.log(data)
			},
			error: err => {
				console.log(err);
			}
		})
	}
	render() {
		return (
			<div>
				{this.props.target}
			</div>
		);
	}
}