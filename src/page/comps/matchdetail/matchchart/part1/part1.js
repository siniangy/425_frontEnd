import React from 'react';
import {
  Row,
  Col,
  Radio,
  Modal,
  Button
} from 'antd';
import Part1Table from './table.js';
import Part1Chart from './chart.js';
import Chart from './knowledgeMap.js';

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
      modalVisible: false,
      modalTarget: '',
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
  handleMapTarget(e) {
    this.setState({
      modalTarget: e
    })
  }
  handleModal(e) {
    this.setState({
      modalVisible: true,
      modalTarget: e.target.innerHTML + '队'
    }, () => {

    });
  }
  handleOk(e) {
    this.setState({
      modalVisible: false,
    });
  }
  handleCancel(e) {
    this.setState({
      modalVisible: false,
    });
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
      modalTarget,
      isLoading
    } = this.state
    return (
      <div style={{border: '2px solid rgba(240,242,245,1)',borderRadius: '10px',padding: '10px',minHeight:'150px'}}>
        <Row>
          <Col span={6} >
            <Row>
              <Col span={12} style={{border: '2px solid rgba(240,242,245,1)',borderRadius: '10px',padding: '10px',minHeight:'150px'}}>
                <h3><b onClick={(e) => this.handleModal(e)} style={{cursor: 'pointer',color:'rgba(24,144,255,1)'}}>{team1Name}</b></h3>
                <Modal
                  title={modalTarget}
                  visible={this.state.modalVisible}
                  onOk={(e) => this.handleOk(e)}
                  onCancel={(e) => this.handleCancel(e)}
                  footer={null}
                >
                  <Chart target={modalTarget} handleMapTarget={this.handleMapTarget.bind(this)}/>
                </Modal>
                <h4 style={{margin:'20px 0'}}><b>{team1Home}</b></h4>
                <h4><b>{team1NowRecord}</b></h4>
              </Col>
              <Col span={12} style={{padding: '0px 10px'}}>
                <img src={team1Img} style={{marginTop:'20px'}}/>
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
                <img src={team2Img} style={{marginTop:'20px'}}/>
              </Col>
              <Col span={12} style={{border: '2px solid rgba(240,242,245,1)',borderRadius: '10px',padding: '10px',minHeight:'150px'}}>
                <h3><b onClick={(e) => this.handleModal(e)} style={{cursor: 'pointer',color:'rgba(24,144,255,1)'}}>{team2Name}</b></h3>
                <h4 style={{margin:'20px 0'}}><b>{team2Home}</b></h4>
                <h4><b>{team2NowRecord}</b></h4>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Part1;