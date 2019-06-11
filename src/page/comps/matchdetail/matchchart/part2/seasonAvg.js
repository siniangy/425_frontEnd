import React from "react";
const nameChange = require("../playerToEng.js")
class SeasonAvgChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      target: "",
      targetDetail: [],
      targetAvg: []
    };
  }
  componentDidMount() { }
  componentWillMount() {
    // 处理球员本场数据
    let dataMatch = this.props.targetDetail[0];
    let data1 = [];
    for (let key in dataMatch) {
      if (key == 3 || key == 13 || (key >= 16 && key <= 21)) {
        data1.push(dataMatch[key]);
      }
    }
    // 处理球员场均数据在Avg方法里，div的id是index！！
    this.getSeasonAvgData(this.props.target, data1, this.props.id);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.target != nextProps.target) {
      if (nextProps.target) {
        // 处理球员本场数据
        let dataMatch = nextProps.targetDetail[0];
        let data1 = [];
        for (let key in dataMatch) {
          if (key == 3 || key == 13 || (key >= 16 && key <= 21)) {
            data1.push(dataMatch[key]);
          }
        }
        // 处理球员场均数据在Avg方法里，div的id是index！！
        this.getSeasonAvgData(nextProps.target, data1, nextProps.id);
      }
    }
  }
  getSeasonAvgData(data, data1, id) {
    let target = "";
    let flag = false;
    let d = "";
    for (let key in nameChange) {
      if (nameChange[key] === data) {
        d = key
        flag = true
      }
    }
    target = (flag === true) ? d : data
    let postData =
      target == "科克-辛里奇"
        ? {
          cnName: "柯克-辛里奇"
        }
        : {
          cnName: target
        };
    $.ajax({
      url: "/getSinglePlayerSeasonAvg",
      type: "post",
      dataType: "json",
      data: postData,
      success: data => {
        let seasonAvg = data[0]["seasonAvg"];
        // console.log(seasonAvg)
        let dataAvg = seasonAvg.map((item, index) => {
          if (item.indexOf("%") != -1) {
            return (parseFloat(item) / 100).toFixed(2);
          } else {
            return parseFloat(item);
          }
        });
        // console.log(dataAvg);
        let data2 = [];
        for (let i in dataAvg) {
          if (i == 5 || i == 14 || (i <= 22 && i >= 17)) {
            data2.push(dataAvg[i]);
          }
        }
        let max = [];
        for (let i = 0; i < data1.length; i++) {
          max[i] = data1[i] > data2[i] ? data1[i] : data2[i];
        }
        let indicator = [
          {
            name: "FG%",
            max: 1
          },
          {
            name: "TRB",
            max: 100
          },
          {
            name: "AST",
            max: 50
          },
          {
            name: "ATL",
            max: 50
          },
          {
            name: "BLK",
            max: 50
          },
          {
            name: "TOV",
            max: 50
          },
          {
            name: "PF",
            max: 50
          },
          {
            name: "PTS",
            max: 200
          }
        ];
        for (let i = 0; i < indicator.length; i++) {
          indicator[i]["max"] = max[i];
        }
        this.getInitialChart(indicator, data1, data2, id);
      },
      error: err => {
        console.log(err);
      }
    });
  }
  getInitialChart(indicator, data1, data2, id) {
    echarts.dispose(document.getElementById(id));
    var myChart = echarts.init(document.getElementById(id));
    myChart.setOption({
      color: ["rgba(0,183,238, 1)", "rgba(86,199,60, 1)"],
      tooltip: {
        show: true,
        trigger: "item"
      },
      radar: {
        center: ["45%", "50%"],
        radius: "70%",
        startAngle: 90,
        splitNumber: 4,
        shape: "circle",
        splitArea: {
          areaStyle: {
            color: ["transparent"]
          }
        },
        axisLabel: {
          show: false,
          fontSize: 20,
          color: "#000",
          fontStyle: "normal",
          fontWeight: "normal"
        },
        axisLine: {
          show: true,
          lineStyle: {
            type: "dashed",
            color: "#000"
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
            color: "#000"
          }
        },
        // indicator的最大值要设定
        indicator: indicator
      },
      series: [
        {
          name: "Local Performance",
          type: "radar",
          symbol: "circle",
          symbolSize: 10,
          areaStyle: {
            normal: {
              color: "rgba(86,199,60, 0.4)"
            }
          },
          itemStyle: {
            color: "rgba(86,199,60, 1)",
            borderColor: "rgba(86,199,60, 0.3)",
            borderWidth: 10
          },
          lineStyle: {
            normal: {
              color: "rgba(86,199,60, 1)",
              width: 2
            }
          },
          data: [data1]
        },
        {
          name: "Career Performance",
          type: "radar",
          symbol: "circle",
          symbolSize: 10,
          itemStyle: {
            normal: {
              color: "rgba(0,183,238, 1)",
              borderColor: "rgba(0,183,238, 0.4)",
              borderWidth: 10
            }
          },
          areaStyle: {
            normal: {
              color: "rgba(0,183,238, 1)"
            }
          },
          lineStyle: {
            normal: {
              color: "rgba(0,183,238, 1)",
              width: 2
            }
          },
          data: [data2]
        }
      ]
    });
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }
  render() {
    return (
      <div>
        <div id={this.props.id} style={{ width: "288px", height: "248px" }} />
      </div>
    );
  }
}

export default SeasonAvgChart;
