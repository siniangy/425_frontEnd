import React from 'react';
import {
	Radio,
	Divider,
	Row,
	Col
} from 'antd'
import Chart1 from './chart1.js';
import Chart3 from './chart3.js';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

export default class Part3 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pointDiff: [],
			diffLength: [],
			team1Name: '',
			team2Name: '',
			team1Players: [],
			team1Relation: [],
			team2Players: [],
			team2Relation: [],
			defaultValue: 'a',
			width: -1
		}
	}
	componentDidMount() {
		this.handleReSize()
		window.addEventListener('resize', this.handleReSize.bind(this))
	}
	componentWillMount() {

	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.handleReSize.bind(this))
	}
	handleReSize() {
		let test = document.getElementById('part3');
		this.setState({
			width: test.clientWidth,
		})
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.data !== nextProps.data) {
			if (nextProps.data) {
				this.handleProps(nextProps.data)
			}
		}
		if (this.props.team1Name !== nextProps.team1Name && this.props.team2Name !== nextProps.team2Name) {
			if (nextProps.team1Name && nextProps.team2Name) {
				this.handleNameProps(nextProps.team1Name, nextProps.team2Name)
			}
		}
	}
	changePointDiff(array) {
		let target = [];
		for (let i = 0; i < array.length; i++) {
			let a = parseInt(array[i][3].split('-')[0]);
			let b = parseInt(array[i][3].split('-')[1]);
			target.push(a - b)
		}
		return target
	}
	changeDiffLength(array) {
		let length = [];
		for (let i in array) {
			length.push(i)
		}
		return length;
	}
	changeRelation(data) {
		let res = [];
		for (let i = 0; i < data.length; i++) {
			let k = 1;
			for (let j = i + 1; j < data.length; j++) {
				if (data[j][0] == data[i][0] && data[j][1] == data[i][1]) {
					k++;
				}
			}
			data[i].push(k, 1);
			res.push(data[i])
		}
		return res;
	}
	changePlayers(data) {
		return [...new Set(data)];
	}
	handleNameProps(data1, data2) {
		this.setState({
			team1Name: data1,
			team2Name: data2
		}, () => {

		})
	}
	handleProps(data) {
		let arr = data[0]['quarter1'].concat(data[0]['quarter2'], data[0]['quarter3'], data[0]['quarter4']);

		let team1Info = arr.filter((item, index) => {
			if (item[2].indexOf('助攻+1') != -1) {
				return item
			}
		})
		let m = []
		let n = [];
		for (let i in team1Info) {
			let a1 = team1Info[i][1].split('命中')[0];
			let b1 = team1Info[i][1].split('分')[1].split('助攻')[0];
			m.push(a1, b1);
			n.push([b1, a1])
		}
		let team1Players = this.changePlayers(m);
		let team1Relation = this.changeRelation(n);

		let team2Info = arr.filter((item, index) => {
			if (item[4].indexOf('助攻+1') != -1) {
				return item
			}
		})
		let k = []
		let j = [];
		for (let i in team2Info) {
			let a2 = team2Info[i][5].split('命中')[0];
			let b2 = team2Info[i][5].split('分')[1].split('助攻')[0];
			k.push(a2, b2);
			j.push([b2, a2])
		}
		let team2Players = this.changePlayers(k);
		let team2Relation = this.changeRelation(j);

		let pointDiff = this.changePointDiff(arr);
		let diffLength = this.changeDiffLength(arr)
		this.setState({
			pointDiff: pointDiff,
			diffLength: diffLength,
			team1Players: team1Players,
			team1Relation: team1Relation,
			team2Players: team2Players,
			team2Relation: team2Relation
		}, () => {

		})
	}
	handleButton(e) {
		this.setState({
			defaultValue: e.target.value
		}, () => {

		})
	}
	render() {
		const {
			pointDiff,
			diffLength,
			team1Players,
			team1Relation,
			team2Players,
			team2Relation,
			defaultValue
		} = this.state
		const {
			team1Name,
			team2Name
		} = this.props
		return (
			<div style={{border: '2px solid rgba(240,242,245,1)',borderRadius: '10px',padding: '10px',minHeight:'150px',marginTop: '20px'}}>
				<Row>
					<Col span={12} style={{paddingRight: '20px',paddingTop: '20px',minWidth:'600px'}}>
						<h3>投篮热点分析</h3>
						<Chart3 teamName={this.state.team2Name} teamNum={defaultValue}/>
					</Col>
					<Col span={12} style={{paddingRight: '20px',paddingTop: '20px',minWidth:'400px'}} id='part3'>
						<h3 style={{}}>球队助攻关系</h3>
						<span>
							<RadioGroup onChange={(e) => this.handleButton(e)} defaultValue="a" style={{}}>
	           	 	<RadioButton value="a">{team1Name}</RadioButton>
	            	<RadioButton value="b">{team2Name}</RadioButton>
	          	</RadioGroup>
						</span>
						<Chart1 players={(defaultValue=='a') ? team1Players : team2Players} relation={(defaultValue=='a') ? team1Relation : team2Relation} width={this.state.width}/>
					</Col>
				</Row>
      </div>
		);
	}
}