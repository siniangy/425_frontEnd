import React from 'react';
import $ from 'jquery';
import {
  Popover,
  Select
} from 'antd';

const Option = Select.Option;

class Part3Chart3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamImg: '',
      teamName: '',
      teamNum: '',
      teamChartData: [],
      chartData: [],
      value: 'quarter',
    };
  }
  componentDidMount() {

  }
  componentWillMount() {

  }
  componentWillReceiveProps(nextProps) {
    if (this.props.teamNum != nextProps.teamNum || this.props.teamName != nextProps.teamName) {
      if (nextProps.teamNum) {
        this.setState({
          teamNum: nextProps.teamNum,
          teamName: nextProps.teamName
        }, () => {
          let num = this.changeNum(this.state.teamNum);
          let name = this.changeName(this.state.teamName);
          this.getSingleMatchShot('https://www.basketball-reference.com/boxscores/shot-chart/201501010' + name + '.html', num)
        })
      }
    }
  }
  changeNum(data) {
    let res = {
      'a': 'team1ChartData',
      'b': 'team2ChartData'
    }
    return res[data]
  }

  changeName(data) {
    let res = {
      '芝加哥公牛': 'CHI',
      '明尼苏达森林狼': 'MIN'
    }
    return res[data]
  }
  getSingleMatchShot(data, num) {
    const that = this;
    const postData = {
      'url': data
    }
    $.ajax({
      url: '/getSingleMatchShot',
      type: 'post',
      dataType: 'json',
      data: postData,
      success: data => {
        this.setState({
          team1Img: data[0]['team1Img'],
          teamChartData: data[0][num],
          chartData: data[0][num]
        }, () => {

        })
      },
      error: err => {
        console.log(err);
      }
    })
  }
  handleChange(e) {
    const Data = this.state.teamChartData.filter((item, index) => {
      return item[2].indexOf(e) != -1
    })
    this.setState({
      value: e,
      chartData: Data
    }, () => {

    })
  }
  render() {
    const {
      team1Img,
      team1ChartData,
      chartData
    } = this.state
    const items = chartData.map((item, index) => {
      let color = {
        color: 'lightblue'
      };
      let style1 = {
        top: item[1].split(';')[0].split(':')[1],
        left: item[1].split(';')[1].split(':')[1],
        position: 'absolute'
      };
      let target = item[3];
      let style2 = {
        color: target == '×' ? 'red' : 'green',
        cursor: 'pointer'
      }
      let p1 = item[2].split('<br>')[0];
      let p2 = item[2].split('<br>')[1];
      let content = (
        <div>
          <p style={{margin:'0px auto'}}>{p1}</p>
          <p style={{margin:'0px auto'}}>{p2}</p>
        </div>
      )
      return (
        <Popover content={content} key={index}>
          <div style={style1}>
            <p style={style2}>{target}</p>
          </div>
        </Popover>
      )
    })
    return (
      <div>
        <div>
          <div>
            <Select defaultValue="quarter" style={{ width: 120 }} onChange={(e) => this.handleChange(e)}>
              <Option value="quarter">All Quarters</Option>
              <Option value="1st">1st Quarter</Option>
              <Option value="2nd">2nd Quarter</Option>
              <Option value="3rd">3rd Quarter</Option>
              <Option value="4th">4th Quarter</Option>
            </Select>
          </div>
          <div style={{position:'relative',margin:'10px 0 0 0'}}>
            <img src={team1Img} />
            {items}
          </div>
        </div>
      </div>
    )
  }
}

export default Part3Chart3;