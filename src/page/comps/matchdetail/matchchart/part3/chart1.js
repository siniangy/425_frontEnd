import React from 'react';
// 引入 ECharts 主模块
import echarts from 'echarts';
// 引入graph
// 报错的话修改为 import echarts from 'echarts'
import 'echarts/lib/chart/graph';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class Part3Chart1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      relation: []
    }
  }
  componentDidMount() {

  }
  componentWillMount() {

  }
  componentWillReceiveProps(nextProps) {
    if (this.props.players != nextProps.players) {
      if (nextProps.players) {
        this.setState({
          players: nextProps.players,
          relation: nextProps.relation
        }, () => {
          this.getInitialChart(this.state.players, this.state.relation)
        })
      }
    }
  }
  getInitialChart(dataName, dataLink) {
    var myChart = echarts.init(document.getElementById('part3Chart1Main'));
    var data = {
      // title: '球队助攻关系',
      dataName: dataName,
      dataLink: dataLink,
      color: [
        '#4CB7F2',
        '#458FF0',
        '#F5B751',
        '#70C6A2',
        '#70649A',
        '#4F726C',
        '#E58980',
        '#BC9F77',
        '#EDC7C7',
        '#B55D4C',
        '#69A8A0',
        '#4CB7F2',
        '#458FF0',
        '#F5B751',
        '#70C6A2'
      ] //颜色种类根据dataName长度定制
    }
    var {
      title,
      dataName,
      dataLink,
      color
    } = data
    var le = data.size || dataName.length;
    // 布局直接用现成的，反正都差不多（8-15个球员）
    if (le == 5) {
      // dataName = [
      //     'c1', 'c2', 'c3', 'c4', 'css',
      // ];
      var symbolSize = 54;
      var xIndex = [
        '100', '80', '120', '85', '115',

      ];
      var yIndex = [
        '80',
        '95', '95',
        '115', '115',
      ];
    } else if (le == 6) {
      var symbolSize = 55;
      var xIndex = [
        '100', '70', '130', '70', '130', '100',

      ];
      var yIndex = [
        '80',
        '95', '95',
        '120', '120',
        '135',
      ];
    } else if (le == 7) {
      var symbolSize = 50;
      var xIndex = [
        '100', '60', '140', '50', '150', '75',
        '125',
      ];
      var yIndex = [
        '55',
        '75', '75',
        '110', '110',
        '145', '145',
      ];
    } else if (le == 8) {
      var symbolSize = 50;
      var xIndex = [
        '100', '60', '140', '40', '160', '60',
        '140', '100',

      ];
      var yIndex = [
        '35',
        '60', '60',
        '100', '100',
        '135', '135',
        '155',
      ];

    } else if (le == 9) {
      var symbolSize = 44;
      var xIndex = [
        '100', '40', '160', '15', '185', '40',
        '100', '160', '100',

      ];
      var yIndex = [
        '18',
        '45', '45',
        '100', '100',
        '150', '100', '150',
        '180',
      ];
    } else if (le == 10) {
      var symbolSize = 44;
      var xIndex = [
        '100', '40', '160', '15', '185', '40',
        '100', '165', '75', '125',

      ];
      var yIndex = [
        '18',
        '45', '45',
        '100', '100',
        '150', '100', '145',
        '180', '180',
      ];
    } else if (le == 11) {
      var symbolSize = 43;
      var xIndex = [
        '100', '40', '160', '15', '185', '40',
        '70', '130', '165', '75', '125',

      ];
      var xIndex = [
        '110', '50', '170', '25', '195', '50',
        '80', '140', '175', '85', '135',

      ];
      var yIndex = [
        '20',
        '45', '45',
        '100', '100',
        '150', '100', '100', '150',
        '180', '180',
      ];
    } else if (le == 12) {
      var symbolSize = 42;
      var xIndex = [
        '110', '50', '170', '25', '195', '80', '140', '50',
        '80', '140', '175', '110',
      ];
      var yIndex = [
        '15',
        '45', '45',
        '100', '100',
        '80', '80',
        '150', '120', '120', '150',
        '180',
      ];

    } else if (le == 13) {
      var symbolSize = 40;
      var xIndex = [
        '100', '40', '160', '15', '185', '70', '130', '40',
        '70', '130', '165', '75', '125',

      ];
      var yIndex = [
        '15',
        '45', '45',
        '100', '100',
        '80', '80',
        '150', '120', '120', '145',
        '180', '180',
      ];
    } else if (le == 14) {
      var symbolSize = 39;
      var xIndex = [
        '100', '40', '160', '15', '100', '185', '65', '135', '40',
        '75', '125', '165', '75', '125',

      ];
      var yIndex = [
        '15',
        '45', '45',
        '100', '60', '100',
        '85', '85',
        '150', '130', '130', '145',
        '180', '180',
      ];
    }

    function getDate() {
      let _data = [];
      for (var i = 0, le = dataName.length; i < le; i++) {
        _data.push({
          name: dataName[i],
          x: xIndex[i],
          y: yIndex[i],
          itemStyle: {
            normal: {
              color: color[i],
            }
          },
          label: {
            normal: {
              x: 'center',
              y: 'center',
              show: true,
              textStyle: {
                fontSize: '12',
                fontWeight: '600',
                lineHeight: '40',
                color: '#000'
              }
            }
          },
        })
      }
      return _data;
    }

    function getLinks() {
      let _data = [];
      for (var i = 0, le = dataLink.length; i < le; i++) {

        _data.push({
          source: dataLink[i][0],
          target: dataLink[i][1],
          lineStyle: {
            normal: {
              opacity: 0.9,
              width: dataLink[i][2] * (2),
              curveness: 0.3,
              color: color[dataLink[i][3] - 1]
            }
          },
        })
      }
      return _data;
    }
    var option = {
      title: {
        text: title,
        x: 'center',
        y: '2%',
        textStyle: {
          color: '#333',
          fontSize: '16',
          fontWeight: 'normal',
          top: '0',
        },
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      series: [{
        type: 'graph',
        layout: 'none',
        symbolSize: symbolSize, //需要根据dataName多少进行调整
        label: {
          normal: {
            show: true
          }
        },
        edgeSymbol: ['circle', 'arrow'],
        edgeSymbolSize: [4, 10],
        edgeLabel: {
          normal: {
            textStyle: {
              fontSize: 20
            }
          }
        },
        data: getDate(),
        links: getLinks(),
      }]
    };
    myChart.setOption(option);
  }
  render() {
    return (
      <div>
        <div id="part3Chart1Main" style={{ width: 500, height: 500}}></div>
      </div>
    )
  }
}

export default Part3Chart1;