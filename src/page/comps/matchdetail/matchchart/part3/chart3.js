import React from 'react';
import {
  Popover
} from 'antd';

class Part3Chart3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamName: '',
      // teamNum: '', 全场展示不需要Num
      team1ChartData: [],
      team2ChartData: [],
      iconSelect: false,
      quarterSelect: ''
    };
  }
  componentDidMount() {

  }
  componentWillMount() {

  }
  componentWillReceiveProps(nextProps) {
    // if (this.props.teamNum != nextProps.teamNum || this.props.teamName != nextProps.teamName) {
    //   if (nextProps.teamNum) {
    //     this.setState({
    //       teamNum: nextProps.teamNum,
    //       teamName: nextProps.teamName
    //     }, () => {
    //       let num = this.changeNum(this.state.teamNum);
    //       let name = this.changeName(this.state.teamName);
    //       this.getSingleMatchShot('https://www.basketball-reference.com/boxscores/shot-chart/201501010' + name + '.html', num)
    //     })
    //   }
    // }
    if (this.props.teamName != nextProps.teamName || this.props.iconSelect != nextProps.iconSelect || this.props.quarterSelect != nextProps.quarterSelect) {
      if (nextProps.teamName) {
        this.setState({
          teamName: nextProps.teamName,
          iconSelect: nextProps.iconSelect,
          quarterSelect: nextProps.quarterSelect
        }, () => {
          let name = this.changeName(this.state.teamName);
          // console.log(name);
          // console.log(this.state.iconSelect);
          // console.log(this.state.quarterSelect)
          this.getSingleMatchShot('https://www.basketball-reference.com/boxscores/shot-chart/201501010' + name + '.html', this.state.quarterSelect, this.state.iconSelect)
        })
      }
    }
  }
  // changeNum(data) {
  //   let res = {
  //     'a': 'team1ChartData',
  //     'b': 'team2ChartData'
  //   }
  //   return res[data]
  // }

  changeName(data) {
    let res = {
      '芝加哥公牛': 'CHI',
      '明尼苏达森林狼': 'MIN'
    }
    return res[data]
  }

  getSingleMatchShot(data, quarter, icon) {
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
        let chart1Data = data[0]['team1ChartData'];
        let chart2Data = data[0]['team2ChartData'];
        let data1 = chart1Data.filter((item, index) => {
          return item[2].indexOf(quarter) != -1
        })
        let data2 = chart2Data.filter((item, index) => {
          return item[2].indexOf(quarter) != -1
        })
        if (icon === true) {
          this.setState({
            team1ChartData: [],
            team2ChartData: []
          })
          this.getCourtLeftHeatmap(data1);
          this.getCourtRightHeatmap(data2);
        } else {
          $('.heatmap-canvas').remove()
          this.setState({
            team1ChartData: data1,
            team2ChartData: data2
          })
        }
      },
      error: err => {
        console.log(err);
      }
    })
  }
  getCourtLeftHeatmap(data) {
    $(".heatmap-canvas").remove()
    const team1ChartData = data.filter((item, index) => {
      return item[2].indexOf('missed') === -1
    });
    var heatmapInstance = window.h337.create({
      container: document.querySelector('#courtLeft'),
      maxOpacity: .85,
      minOpacity: 0,
      blur: 1,
      // gradient: {
      //   '.5': 'blue',
      //   '.8': 'green',
      //   '.95': 'white'
      // }
    });
    var points = [];
    var len = team1ChartData.length;
    while (len--) {
      var point = {
        x: (parseFloat(team1ChartData[len][1].split(';')[1].split(':')[1].split('p')[0])) + 4,
        y: (parseFloat(team1ChartData[len][1].split(';')[0].split(':')[1].split('p')[0])) + 10.5,
        value: 1 // 每个投篮点的value应该一样
      };
      points.push(point);
    }
    var max = 1;
    var data = {
      max: max,
      data: points
    };
    heatmapInstance.setData(data);
  }
  getCourtRightHeatmap(data) {
    const team2ChartData = data.filter((item, index) => {
      return item[2].indexOf('missed') === -1
    });
    var heatmapInstance = window.h337.create({
      container: document.querySelector('#courtRight'),
      maxOpacity: .85,
      minOpacity: 0,
      blur: 1
    });
    var points = [];
    var len = team2ChartData.length;
    while (len--) {
      var point = {
        x: (parseFloat(team2ChartData[len][1].split(';')[1].split(':')[1].split('p')[0])) + 4,
        y: (parseFloat(team2ChartData[len][1].split(';')[0].split(':')[1].split('p')[0])) + 10.5,
        value: 1
      };
      points.push(point);
    }
    var max = 1;
    var data = {
      max: max,
      data: points
    };
    heatmapInstance.setData(data);
  }

  render() {
    const {
      team1ChartData,
      team2ChartData,
    } = this.state
    const item1s = team1ChartData.map((item, index) => {
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
    const item2s = team2ChartData.map((item, index) => {
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
          <div style={{marginTop:'20px'}}>
            <div id="courtLeft" style={{width:'500px','height':'472px',position:'relative',display:'inline-block',transform:'rotate(-90deg)',marginRight:'-28px'}}>
              <img src="/images/nbahalfcourt.png" style={{}} alt="team1Img" />
              {item1s}
            </div>
            <div id="courtRight" style={{width:'500px','height':'472px',position:'relative',display:'inline-block',transform:'rotate(90deg)'}}>
              <img src="/images/nbahalfcourt.png" style={{}} alt="team2Img" />
              {item2s}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Part3Chart3;