import React from 'react';
// 引入 ECharts 主模块
import echarts from 'echarts/dist/echarts.common';
// 引入折线图
import 'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class Part1Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      team1Name: '',
      team2Name: '',
      team1Score: [],
      team2Score: []
    }
  }
  componentDidMount() {
    this.getInitialChart(this.props.team1Name, this.props.team2Name, this.props.team1Score, this.props.team2Score)
  }
  componentWillMount() {
    // console.log(this.props.team1Name)
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.team1Name != nextProps.team1Name) {
      if (nextProps.team1Name) {
        this.setState({
          team1Name: nextProps.team1Name,
          team2Name: nextProps.team2Name,
          team1Score: nextProps.team1Score,
          team2Score: nextProps.team2Score
        }, () => {
          // this.getInitialChart(this.state.team1Name, this.state.team2Name, this.state.team1Score, this.state.team2Score)
        })
      }
    }
  }
  getInitialChart(team1Name, team2Name, team1Score, team2Score) {
    var myChart = echarts.init(document.getElementById('part1Main'));
    let team = [team1Name, team2Name];
    myChart.setOption({
      title: {
        text: '单节比分对比'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: team
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {
            show: true
          }
        }
      },
      calculable: true,
      xAxis: [{
        type: 'category',
        data: ['第一节', '第二节', '第三节', '第四节']
      }],
      yAxis: [{
        type: 'value'
      }],
      series: [{
        name: team[0],
        type: 'bar',
        data: team1Score,
        markLine: {
          data: [{
            type: 'average',
            name: '平均值'
          }]
        }
      }, {
        name: team[1],
        type: 'bar',
        data: team2Score,
        markLine: {
          data: [{
            type: 'average',
            name: '平均值'
          }]
        }
      }]
    })
  }
  render() {
    const {
      team1Name
    } = this.state
    return (
      <div>
        <div id="part1Main" style={{ width: 750, height: 300}}></div>
      </div>
    )
  }
}

export default Part1Chart;