import React from 'react';
import {
  Radio,
  Row,
  Col,
  Table
} from 'antd'
import Part2Table from './table.js';
import Part2Chart from './chart.js';

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
      team1Max: [],
      team2Max: [],
      team1ScoreMax: [],
      team1ReboundMax: [],
      team1AssistMax: [],
      team2ScoreMax: [],
      team2ReboundMax: [],
      team2AssistMax: [],
      team1Name: '',
      team2Name: '',
      team1SummaryChart: [],
      team2SummaryChart: [],
      defaultValue: 'a',
      width: -1,
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
  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      if (nextProps.data) {
        this.handleProps(nextProps.data)
      }
    }
  }
  handleReSize() {
    let test = document.getElementById('part2');
    this.setState({
      width: test.clientWidth,
    })
  }
  selectData(data) {
    let res = [];
    for (let i = 0; i < data.length; i++) {
      if (i == 1 || i == 4 || i == 7 || i == 11 || (i >= 14 && i < 19)) {
        res.push(data[i] * -1)
      } else {
        continue;
      }
    }
    return res;
  }

  selectData2(data) {
    let res = [];
    for (let i = 0; i < data.length; i++) {
      if (i == 1 || i == 4 || i == 7 || i == 11 || (i >= 14 && i < 19)) {
        res.push(data[i])
      } else {
        continue;
      }
    }
    return res;
  }
  changeIntoAll(data) {
    if (data[3].indexOf('%') == -1) data.splice(3, 0, '0%');
    if (data[6].indexOf('%') == -1) data.splice(6, 0, '0%');
    if (data[9].indexOf('%') == -1) data.splice(9, 0, '0%');
    if (data[12].indexOf('%') == -1) data.splice(12, 0, '0%');
    return data;
  }
  changeIntoSummaryNumber(data) {
    let res = [];
    for (let i = 0; i < data.length; i++) {
      res.push(parseInt(data[i]))
    }
    return res;
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
    let json = {
      'key': Math.random() * 100
    };
    for (let i = 0; i < data.length; i++) {
      json[i] = data[i]
    }
    return json
  }

  selectMax(data) {
    let scoreMax = data[0][21];
    let reboundMax = data[0][13];
    let asssitMax = data[0][16];
    let target = [];
    let score = 0;
    let rebound = 0;
    let asssit = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i][21] > scoreMax) {
        score = i
        scoreMax = data[i][21]
      } else {
        continue
      }
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i][13] > reboundMax) {
        rebound = i
        reboundMax = data[i][13]
      } else {
        continue
      }
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i][16] > asssitMax) {
        asssit = i
        asssitMax = data[i][13]
      } else {
        continue
      }
    }
    target = [score, rebound, asssit];
    return target
  }
  handleProps(data) {
    let team1Detail = data[0]['team1Detail'].map((item) => {
      return this.changeIntoJson(this.changeIntoNumber(this.changeIntoAll(item)))
    })
    let team2Detail = data[0]['team2Detail'].map((item) => {
      return this.changeIntoJson(this.changeIntoNumber(this.changeIntoAll(item)))
    })
    let team1Max = this.selectMax(data[0]['team1Detail'].map((item) => {
      return this.changeIntoNumber(this.changeIntoAll(item))
    }))
    let team2Max = this.selectMax(data[0]['team2Detail'].map((item) => {
      return this.changeIntoNumber(this.changeIntoAll(item))
    }))
    let team1SummaryChart = this.selectData(this.changeIntoSummaryNumber(data[0]['team1Summary'][0]))
    let team2SummaryChart = this.selectData2(this.changeIntoSummaryNumber(data[0]['team2Summary'][0]))
    this.setState({
      team1Detail: team1Detail,
      team2Detail: team2Detail,
      team1Summary: data[0]['team1Summary'],
      team2Summary: data[0]['team2Summary'],
      team1Name: data[0]['team1Info'][1],
      team2Name: data[0]['team2Info'][1],
      team1Max: team1Max,
      team2Max: team2Max,
      team1ScoreMax: [team1Detail[team1Max[0]][0], team1Detail[team1Max[0]][21]],
      team1ReboundMax: [team1Detail[team1Max[1]][0], team1Detail[team1Max[0]][13]],
      team1AssistMax: [team1Detail[team1Max[2]][0], team1Detail[team1Max[0]][16]],
      team2ScoreMax: [team2Detail[team2Max[0]][0], team2Detail[team2Max[0]][21]],
      team2ReboundMax: [team2Detail[team2Max[1]][0], team2Detail[team2Max[0]][13]],
      team2AssistMax: [team2Detail[team2Max[2]][0], team2Detail[team2Max[0]][16]],
      team1SummaryChart: team1SummaryChart,
      team2SummaryChart: team2SummaryChart,
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
      defaultValue,
      team1Max,
      team2Max,
      team1ScoreMax,
      team1ReboundMax,
      team1AssistMax,
      team2ScoreMax,
      team2ReboundMax,
      team2AssistMax,
      team1SummaryChart,
      team2SummaryChart
    } = this.state
    const arr = team1Detail
    const dataSource = [{
      key: '0',
      0: '得分',
      1: team1ScoreMax,
      2: team2ScoreMax,
    }, {
      key: '1',
      0: '篮板',
      1: team1ReboundMax,
      2: team2ReboundMax,
    }, {
      key: '2',
      0: '助攻',
      1: team1AssistMax,
      2: team2AssistMax,
    }];
    const columns = [{
      title: '',
      dataIndex: '0',
      key: '0'
    }, {
      title: team1Name,
      dataIndex: '1',
      key: '1',
      render: text => (
        <div>
          <p style={{fontSize:'14px'}}>{text[0]}</p>
          <b style={{fontSize:'14px'}}>{text[1]}</b>
        </div>
      )
    }, {
      title: team2Name,
      dataIndex: '2',
      key: '2',
      render: text => (
        <div>
          <p style={{fontSize:'14px'}}>{text[0]}</p>
          <b style={{fontSize:'14px'}}>{text[1]}</b>
        </div>
      )
    }];
    return (
      <div style={{border: '2px solid rgba(240,242,245,1)',borderRadius: '10px',padding: '10px',minHeight:'150px',marginTop: '20px'}}>
        <Row>
          <Col span={16} id='part2' style={{paddingRight: '20px',paddingTop: '20px',minWidth:'550px'}}>
            <h3>球队数据对比</h3>
            <Part2Chart team1Name={team1Name} team2Name={team2Name} team1SummaryChart={team1SummaryChart} team2SummaryChart={team2SummaryChart} width={this.state.width}/>
          </Col>
          <Col span={8} style={{paddingTop: '20px',minWidth:'300px'}}>
            <h3>各项最佳</h3>       
            <Table dataSource={dataSource} columns={columns} pagination={false}/>
          </Col>
        </Row>
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