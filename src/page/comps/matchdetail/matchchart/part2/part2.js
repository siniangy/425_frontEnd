import React from 'react';
import {
  Radio,
  Divider,
  Row,
  Col
} from 'antd'
import Part2Table from './table.js';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
class Part2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      team1Detail: [],
      team2Detail: [],
      team1Summary: [],
      team2Summary: [],
      team1Name: '',
      team2Name: '',
      defaultValue: 'a'
    }
  }
  componentDidMount() {

  }
  componentWillMount() {

  }
  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      if (nextProps.data) {
        this.handleProps(nextProps.data)
      }
    }
  }

  changeIntoAll(data) {
    if (data[3].indexOf('%') == -1) data.splice(3, 0, '0%');
    if (data[6].indexOf('%') == -1) data.splice(6, 0, '0%');
    if (data[9].indexOf('%') == -1) data.splice(9, 0, '0%');
    if (data[12].indexOf('%') == -1) data.splice(12, 0, '0%');
    return data;
  }

  changeIntoNumber(data) {
    let res = data.map((item, index) => {
      if (index == 0)
        return item.toString();
      else {
        if (item.indexOf('%') != -1)
          return parseInt(item) / 100
        else
          return parseInt(item)
      }
    })
    return res;
  }

  changeIntoJson(data) {
    let json = {};
    for (let i = 0; i < data.length; i++) {
      json[i] = data[i]
    }
    return json
  }
  handleProps(data) {
    let team1Detail = data[0]['team1Detail'].map((item) => {
      return this.changeIntoJson(this.changeIntoNumber(this.changeIntoAll(item)))
    })
    let team2Detail = data[0]['team2Detail'].map((item) => {
      return this.changeIntoJson(this.changeIntoNumber(this.changeIntoAll(item)))
    })
    this.setState({
      team1Detail: team1Detail,
      team2Detail: team2Detail,
      team1Summary: data[0]['team1Summary'],
      team2Summary: data[0]['team2Summary'],
      team1Name: data[0]['team1Info'][1],
      team2Name: data[0]['team2Info'][1],
    }, () => {

    })
  }
  handleButton(e) {
    this.setState({
      defaultValue: e.target.value
    })
  }
  render() {
    const {
      team1Detail,
      team2Detail,
      team1Summary,
      team2Summary,
      team1Name,
      team2Name,
      defaultValue
    } = this.state
    return (
      <div style={{border: '2px solid rgba(240,242,245,1)',borderRadius: '10px',padding: '10px',minHeight:'150px',marginTop: '20px'}}>
        <div style={{margin: '10px auto'}}>
          <RadioGroup onChange={(e) => this.handleButton(e)} defaultValue="a">
            <RadioButton value="a">{team1Name}</RadioButton>
            <RadioButton value="b">{team2Name}</RadioButton>
          </RadioGroup>
        </div>
        <Part2Table teamDetail={(defaultValue=='a') ? team1Detail : team2Detail}/>
      </div>
    )
  }
}

export default Part2;