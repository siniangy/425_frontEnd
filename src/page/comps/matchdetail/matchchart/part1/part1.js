import React from 'react';
import {
  Row,
  Col,
  Radio,
  Skeleton
} from 'antd';
import Part1Table from './table.js';
import Part1Chart from './chart.js';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
class Part1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      team1Name: '',
      team1Home: '',
      team1NowRecord: '',
      team1Img: '',
      team1Score: '',
      team2Name: '',
      team2Home: '',
      team2NowRecord: '',
      team2Img: '',
      team2Score: '',
      team1Sum: 0,
      team2Sum: 0,
      defaultSwitchValue: 'a',
      isLoading: false
    }
  }
  componentDidMount() {

  }
  componentWillMount() {

  }
  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      if (nextProps.data) {
        this.setState({
          isLoading: true
        })
        this.handleProps(nextProps.data)
      }
    }
  }
  handleTeamSum(data) {
    let res = 0;
    for (let i = 0; i < data.length; i++) {
      res += parseInt(data[i])
    }
    return res;
  }
  handleProps(data) {
    this.setState({
      team1Name: data[0]['team1Info'][1],
      team1Home: data[0]['team1Home'][1],
      team1NowRecord: data[0]['team1Info'][2],
      team1Img: data[0]['team1Info'][0],
      team1Score: data[0]['team1Score'],
      team2Name: data[0]['team2Info'][1],
      team2Home: data[0]['team2Home'][1],
      team2NowRecord: data[0]['team2Info'][2],
      team2Img: data[0]['team2Info'][0],
      team2Score: data[0]['team2Score'],
      team1Sum: this.handleTeamSum(data[0]['team1Score']),
      team2Sum: this.handleTeamSum(data[0]['team2Score'])
    }, () => {

    })
  }
  handleButton(e) {
    this.setState({
      defaultSwitchValue: e.target.value
    }, () => {

    })
  }
  render() {
    const {
      team1Name,
      team1Home,
      team1NowRecord,
      team1Img,
      team1Score,
      team2Name,
      team2Home,
      team2NowRecord,
      team2Img,
      team2Score,
      team1Sum,
      team2Sum,
      defaultSwitchValue,
      isLoading
    } = this.state
    return (
      <div style={{border: '2px solid rgba(240,242,245,1)',borderRadius: '10px',padding: '10px',minHeight:'150px'}}>
        <Row>
          <Col span={6} >
            <Row>
              <Col span={12} style={{border: '2px solid rgba(240,242,245,1)',borderRadius: '10px',padding: '10px',minHeight:'150px'}}>
                <p>{team1Name}</p>
                <p>{team1Home}</p>
                <p>{team1NowRecord}</p>
              </Col>
              <Col span={12} style={{padding: '0px 10px'}}>
                <img src={team1Img} />
              </Col>
            </Row>
          </Col>
          <Col span={12} style={{paddingLeft:'20px'}}>
            <div style={{margin: '10px auto'}}>
              <RadioGroup onChange={(e) => this.handleButton(e)} defaultValue="a">
                <RadioButton value="a">Table</RadioButton>
                <RadioButton value="b">Chart</RadioButton>
              </RadioGroup>
            </div>
            {(defaultSwitchValue=='a') ? 
              (<Part1Table team1Name={team1Name} team2Name={team2Name} team1Score={team1Score} team2Score={team2Score} team1Sum={team1Sum} team2Sum={team2Sum}/>)         
            :
              (<Part1Chart team1Name={team1Name} team2Name={team2Name} team1Score={team1Score} team2Score={team2Score}/>)
            }
          </Col>
          <Col span={6}>
            <Row>
              <Col span={12} style={{padding: '0px 10px'}}>
                <img src={team2Img} />
              </Col>
              <Col span={12} style={{border: '2px solid rgba(240,242,245,1)',borderRadius: '10px',padding: '10px',minHeight:'150px'}}>
                <p>{team2Name}</p>
                <p>{team2Home}</p>
                <p>{team2NowRecord}</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Part1;