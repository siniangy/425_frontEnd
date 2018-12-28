import React from 'react';

import echarts from 'echarts/dist/echarts.common';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class Part1Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      team1Name: '',
      team2Name: '',
      team1Score: [],
      team2Score: [],
      width: this.props.width
    }
  }
  componentDidMount() {
    this.getInitialChart(this.props.team1Name, this.props.team2Name, this.props.team1Score, this.props.team2Score)
  }
  componentWillMount() {

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
          this.getInitialChart(this.state.team1Name, this.state.team2Name, this.state.team1Score, this.state.team2Score)
        })
      }
    }
  }
  getInitialChart(team1Name, team2Name, team1Score, team2Score) {
    var myChart = echarts.init(document.getElementById('part1Main'));
    let team = [team1Name, team2Name];
    myChart.setOption({
      title: {

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
    window.addEventListener('resize', function() {
      myChart.resize();
    })
  }
  render() {
    const {
      team1Name
    } = this.state
    const width = this.props.width
    return (
      <div>
        <div id="part1Main" style={{ width: width, height: 250}}></div>
      </div>
    )
  }
}

export default Part1Chart;