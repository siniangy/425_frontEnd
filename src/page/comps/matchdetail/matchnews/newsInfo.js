import React from "react";
import { Spin } from "antd";

export default class NewsMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      target: this.props.target,
      showData: [],
      showFilterData: []
    };
  }
  componentWillMount() {
    this.handleShowData(
      "https://www.easy-mock.com/mock/5bf3713695d22b57c4fe73a6/example/news",
      this.props.target
    );
  }
  componentDidMount() { }

  handleShowData(url, string) {
    const changeJson = {
      "达米安-利拉德": "PORPlayerA",
      "CJ-麦科勒姆": "PORPlayerB",
      "勒布朗-詹姆斯": "LALPlayerA",
      "布兰登-英格拉姆": "LALPlayerB"
    };
    const target = changeJson[string];
    $.ajax({
      url: url,
      type: "get",
      dataType: "json",
      success: res => {
        const data = this.handleMapData(res.data[target]["data"][0]["row"]);
        const data2 = data.filter((item, index) => { return item[0] != "主页" });
        this.setState(
          {
            showData: data,
            showFilterData: data2
          },
          () => {
            // console.log(this.changeLink(this.state.showFilterData))
            this.getInitialChart(
              this.changeData(this.state.showFilterData),
              this.changeLink(this.state.showFilterData),
              this.changeCategories(this.state.showFilterData),
              string,
              this.state.showData
            );
          }
        );
      },
      error: err => {
        console.log(err);
      }
    });
  }
  handleMapData(data) {
    let A = [];
    let B = [];
    for (let key in data[0]) {
      let a = [];
      let b = [];
      if (key == "姓名") {
        a.push(key, data[0][key]);
        A.push(a);
      } else {
        b.push(key, data[0][key]);
        B.push(b);
      }
    }
    return A.concat(B);
  }
  changeData(array) {
    let data = [];
    let color = [
      "#4CB7F2",
      "#458FF0",
      "#F5B751",
      "#70C6A2",
      "#70649A",
      "#4F726C",
      "#E58980",
      "#BC9F77",
      "#EDC7C7",
      "#B55D4C",
      "#69A8A0",
      "#4CB7F2",
      "#458FF0",
      "#F5B751",
      "#70C6A2",
      "#B28ECC",
      "#68A79F",
      "#E58980",
      "#BC9F77",
      "#EDC7C7"
    ];
    let y = [100, 150, 200, 250];
    for (let i in array) {
      let d = {
        symbolSize: 60,
        draggable: "true",
        itemStyle: {
          normal: {
            color: color[i]
          }
        }
      };
      d.name = array[i][1];
      d.category = array[i][i];
      d.x = i * 10;
      d.y = y[Math.ceil(Math.random() * 3)];
      data.push(d);
    }
    return data;
  }
  changeLink(array) {
    let link = [];
    for (let i = 1; i < array.length; i++) {
      let d = {
        source: array[0][1]
      };
      d.target = array[i][1];
      d.value = array[i][0];
      link.push(d);
    }
    return link;
  }
  changeCategories(array) {
    let categories = [];
    for (let i in array) {
      let d = {};
      d.name = array[i][1];
      categories.push(d);
    }
    return categories;
  }

  getInitialChart(data, link, categories, id, showData) {
    var chart = document.getElementById(id);
    echarts.dispose(chart);
    var myChart = echarts.init(chart);
    var option = {
      title: {},
      tooltip: {
        formatter: "{b}"
      },
      series: [
        {
          name: "球员知识图谱（测试）",
          type: "graph",
          layout: "force",
          force: {
            repulsion: 60,
            gravity: 0.1,
            edgeLength: 30,
            layoutAnimation: true
          },
          data: data,
          links: link,
          categories: categories,
          roam: false,
          edgeLabel: {
            normal: {
              show: true,
              textStyle: {
                fontSize: 10
              },
              formatter: function (params) {
                // console.log(params)
                return params.data.value
              }
            }
          },
          label: {
            normal: {
              show: true,
              position: "inside",
              formatter: "{b}",
              fontSize: 12,
              fontStyle: "600"
            }
          },
          lineStyle: {
            normal: {
              width: 2,
              color: "target",
              curveness: 0,
              type: "solid"
            }
          }
        }
      ]
    };
    myChart.setOption(option);
    myChart.on("click", function (params) {
      let url = showData.filter((item, index) => { return item[0] === "主页" });
      if (params.data.category == "姓名") {
        // console.log(url[0][1])
        window.open(url[0][1]);
      }
    });
  }
  render() {
    return (
      <div>
        <div
          id={this.props.target}
          style={{ width: "460px", height: "400px" }}
        />
      </div>
    );
  }
}
