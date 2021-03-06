import React from "react";

class Part2BasicChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      team1Name: "",
      team2Name: "",
      team1SummaryChart: [],
      team2SummaryChart: [],
      width: this.props.width
    };
  }
  componentDidMount() {
    // 切换标签时渲染
    this.getInitialChart(
      this.props.team1Name,
      this.props.team2Name,
      this.props.team1SummaryChart,
      this.props.team2SummaryChart
    );
  }

  componentWillMount() {}

  componentWillReceiveProps(nextProps) {
    // 切换比赛时渲染
    if (this.props.team1SummaryChart != nextProps.team1SummaryChart) {
      if (nextProps.team1Name) {
        this.setState(
          {
            team1Name: nextProps.team1Name,
            team2Name: nextProps.team2Name,
            team1SummaryChart: nextProps.team1SummaryChart,
            team2SummaryChart: nextProps.team2SummaryChart
          },
          () => {
            this.getInitialChart(
              this.state.team1Name,
              this.state.team2Name,
              this.state.team1SummaryChart,
              this.state.team2SummaryChart
            );
          }
        );
      }
    }
  }

  getInitialChart(team1Name, team2Name, team1SummaryChart, team2SummaryChart) {
    // var myChart;
    // if (myChart != null && myChart != "" &&
    //   myChart != undefined) {
    //   myChart.dispose(); 销毁实例
    // }
    var chart = document.getElementById("part2Main");
    echarts.dispose(chart);
    var myChart = echarts.init(chart);
    var labelData = [
      "投篮%",
      "三分%",
      "罚球%",
      "篮板",
      "助攻",
      "抢断",
      "盖帽",
      "失误",
      "犯规"
    ];
    var womanData = team1SummaryChart;
    var manData = team2SummaryChart;
    var option = {
      backgroundColor: "#fff",
      legend: {
        orient: "horizontal", // 'vertical'
        x: "30%", // 'center' | 'left' | {number},
        y: "top", // 'center' | 'bottom' | {number}
        data: [
          {
            name: team1Name,
            textStyle: {
              fontWeight: "bolder",
              padding: [10, 100, 15, 0]
              // color:'#cccccc'
            }
          },
          {
            name: team2Name,
            textStyle: {
              fontSize: 12,
              fontWeight: "bolder"
            }
          }
        ]
      },
      // tooltip（提示框组件）
      tooltip: {
        //trigger(触发类型)，可选'item','axis','none'
        trigger: "axis",
        axisPointer: {
          //指示器类型,可选'line','shadow','cross'
          type: "shadow"
        },
        // 自定义提示内容
        formatter: function(a) {
          var v = a[0];
          return (
            v.name +
            "<br/>" +
            v.marker +
            v.seriesName +
            "：" +
            Math.abs(v.value)
          );
        }
      },
      toolbox: {
        show: true,
        right: "35px",
        feature: {
          saveAsImage: {
            show: true
          }
        }
      },
      xAxis: [
        {
          type: "value",
          min: -100,
          max: 0,
          gridIndex: 0,
          axisTick: {
            show: false,
            inside: false
          },
          axisLabel: {
            show: false
          },
          axisLine: {
            // Y轴轴线样式
            show: false,
            lineStyle: {
              color: "#000"
            }
          },
          splitLine: {
            show: false
          }
        },
        {
          type: "value",
          gridIndex: 1,
          min: 0,
          max: 100,
          axisTick: {
            show: false
          }, //是否显示刻度
          axisLine: {
            // Y轴轴线样式
            show: false, // 是否显示X轴
            lineStyle: {
              color: "#000"
            }
          },
          axisLabel: {
            show: false //是否显示X轴内容
          },
          splitLine: {
            show: false
          }
        }
      ],
      yAxis: [
        {
          type: "category",
          gridIndex: 0,
          inverse: true,
          data: labelData,
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisLine: {
            // Y轴轴线样式
            show: false,
            lineStyle: {
              color: "#000"
            }
          }
        },
        {
          type: "category",
          gridIndex: 1,
          inverse: true,
          data: labelData,
          axisTick: {
            show: false
          },
          axisLabel: {},
          axisLine: {
            show: false //是否显示轴线
          }
        }
      ],
      grid: [
        {
          top: 50,
          width: "46%",
          left: 0,
          gridIndex: 0
        },
        {
          top: 50,
          left: "54%",
          right: 0,
          gridIndex: 1
        }
      ],
      color: ["#2FACFA", "#F5A623"],
      series: [
        {
          name: team1Name,
          type: "bar",
          barWidth: "20",
          gridIndex: 0,
          itemStyle: {
            normal: {
              show: true,
              color: "#5de3e1",
              barBorderRadius: 50,
              borderWidth: 0,
              borderColor: "#333",
              label: {
                show: true,
                position: "left",
                formatter: function(v) {
                  return v.value * -1;
                }
              }
            }
          },
          data: womanData
        },
        {
          name: team2Name,
          type: "bar",
          barWidth: "20",
          xAxisIndex: 1,
          yAxisIndex: 1,
          itemStyle: {
            normal: {
              show: true,
              color: "#8A3EEB",
              barBorderRadius: 50,
              borderWidth: 0,
              borderColor: "#333",
              label: {
                show: true,
                position: "right",
                formatter: function(v) {
                  return v.value;
                }
              }
            }
          },
          data: manData
        }
      ]
    };
    myChart.setOption(option);
    // window.addEventListener("resize", function() {
    //   myChart.resize();
    // });
  }

  render() {
    const width = this.props.width;
    return (
      <div>
        <div
          id="part2Main"
          style={{
            width: width,
            height: 400,
            // maxWidth: "800px"
          }}
        />
      </div>
    );
  }
}

export default Part2BasicChart;
