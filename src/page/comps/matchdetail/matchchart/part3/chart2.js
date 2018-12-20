import React from 'react';
// 引入 ECharts 主模块
import echarts from 'echarts/dist/echarts.common';
// 引入折线图
import 'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class Part3Chart2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pointDiff: [],
      diffLength: []
    }
  }
  componentDidMount() {

  }
  componentWillMount() {

  }
  componentWillReceiveProps(nextProps) {
    if (this.props.pointDiff != nextProps.pointDiff) {
      if (nextProps.pointDiff) {
        this.setState({
          pointDiff: nextProps.pointDiff,
          diffLength: nextProps.diffLength
        }, () => {
          this.getInitialChart(this.state.pointDiff, this.state.diffLength)
        })
      }
    }
  }
  getInitialChart(target, length) {
    echarts.dispose(document.getElementById("part3Chart2Main"))
    var myChart = echarts.init(document.getElementById('part3Chart2Main'));
    var option = {
      tooltip: {
        trigger: 'axis',
        position: function(pt) {
          return [pt[0], '10%'];
        },
        formatter: function(params, callback) {
          // console.log(params[0]['value'])
          let showHtml = "";
          let value = params[0]['value']
          if (value > 0) {
            showHtml = 'DEN' + ' leading by ' + value
          }
          if (value < 0) {
            showHtml = 'DEN' + ' trailing by ' + value
          }
          if (value == 0) {
            showHtml = 'Game tied with point diff ' + value
          }
          return showHtml;
        }
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: length,
        axisLine: {
          lineStyle: {
            color: '#A0A0A0',
            width: '2',
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            shadowBlur: 2
          }
        },
        axisLabel: {
          show: false
        },
        axisTick: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        show: false
      },
      series: [{
        name: 'Den',
        type: 'line',
        smooth: true,
        symbol: 'none',
        sampling: 'average',
        itemStyle: {
          normal: {
            lineStyle: {
              color: 'lightblue'
            }
          }
        },
        data: target
      }]
    };
    myChart.setOption(option);
  }
  render() {
    return (
      <div>
        <div id="part3Chart2Main" style={{ width: 500, height: 300}}></div>
      </div>
    )
  }
}

export default Part3Chart2;